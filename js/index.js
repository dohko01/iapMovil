// JavaScript Document
/********** END LOGIN ************************/
$(document).ready(function(){
//document.addEventListener("deviceready", function(){
//function onDeviceReady(){
	document.addEventListener("deviceready", setOverrideBackbutton, false);
	
	$('#botonLogin').click(function(){
		alert('asdfasdfasdf');
		var datosUsuario = $("#usuario").val();
		var datosPassword = $("#pw").val();
	 
		$.ajax({
			type : 'POST',           
			url : 'http://192.168.1.66:45001/iapMovil/loginValidation.php',           
			data:{
				'usuario':datosUsuario,
				'pw':datosPassword
			},
			beforeSend: function(){
				$('#loading').show();
			},
			success : function(data) {
				if(data==1){
					createInfoData(datosUsuario, datosPassword);
				} else {
					alert("Invalid Login!!"); 
				}
				$('#loading').hide();
			},
			error : function(xhr, type) {
				alert('server error occurred');
				$('#loading').hide();
			}
		});
	});
});

function createInfoData(){
	var db = window.openDatabase("test", "1.0", "iapTest", 200000);
	db.transaction(insertUsuario, errorCB, successCreate);
}

function insertUsuario(tx) {
	var datosUsuario = $("#usuario").val();
	var datosPassword = $("#pw").val();
	 
     tx.executeSql('DROP TABLE IF EXISTS usuario');
     tx.executeSql('CREATE TABLE IF NOT EXISTS usuario (usuario, pw)');
     tx.executeSql('INSERT INTO usuario (usuario, pw) VALUES ("'+datosUsuario+'", "'+datosPassword+'")');
}

function successCreate() {
    $.mobile.changePage('#home','slide');
}

function setOverrideBackbutton()
{
	if (typeof device != "undefined" && device.platform == "Android")
	{
		navigator.app.overrideBackbutton(true);
	}
	document.addEventListener("backbutton", function(){alert("LOL NO SIRVE!!!");}, true);
}

/********** END LOGIN ************************/

function isUserLogged()
{
	var db = window.openDatabase("test", "1.0", "iapTest", 200000);
	db.transaction(checkUser, errorCB, successCB);
}

function checkUser(tx) {
	tx.executeSql('SELECT * FROM usuario', [], successQuery, errorCB);	
}

function errorCB(err) {
    $.mobile.changePage('#login','slide');
}

function successQuery(tx, result) {
	alert(result.rows.length);
	if(result.rows.length > 0){
		$( "#login" ).remove();
    	$.mobile.changePage('#home','slide');
	}
	else
		$.mobile.changePage('#login','slide');
}

function successCB() {
    //alert("success!");
}