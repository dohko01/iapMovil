//$(document).ready(function(){
document.addEventListener("deviceready", function(){
	isUserLogged();
	
	$('#botonLogin').click(function(){
		var datosUsuario = $("#usuario").val();
		var datosPassword = $("#pw").val();
	 
		$.ajax({
			type : 'POST',           
			url : 'http://192.168.161.131:45001/iapMovil/loginValidation.php',           
			data:{
				'usuario':datosUsuario,
				'pw':datosPassword
			},
			success : function(data) {            
				if(data==1){
					createInfoData(datosUsuario, datosPassword);
				} else {
					alert("Invalid Login!!"); 
				}
			},
			error : function(xhr, type) {
				alert('server error occurred');
				event.preventDefault();
			}
		});
	});
});

function createInfoData(){
	var db = window.openDatabase("test", "1.0", "iapTest", 200000);
	alert(db.transaction(insertUsuario, errorCB, successCB));
}

function insertUsuario(tx) {
	var datosUsuario = $("#usuario").val();
	var datosPassword = $("#pw").val();
	 
     tx.executeSql('DROP TABLE IF EXISTS usuario');
     tx.executeSql('CREATE TABLE IF NOT EXISTS usuario (usuario, pw)');
     tx.executeSql('INSERT INTO usuario (usuario, pw) VALUES ("'+datosUsuario+'", "'+datosPassword+'")');
}

function isUserLogged()
{
	var db = window.openDatabase("test", "1.0", "iapTest", 200000);
	alert(db.transaction(checkUser, errorCB, successCB));
}

function checkUser(tx) {
	var usuario = $("#usuario").val();
	var pw = $("#pw").val();
	tx.executeSql('SELECT * FROM usuario', [], successQuery, errorCB);	
}

function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

function successQuery(tx, result) {
	if(result.rows.length > 0)
    	alert("success!");
	else
		alert("No hay usuario loggeado");
}

function successCB() {
    alert("success!");
}