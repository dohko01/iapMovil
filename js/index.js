// JavaScript Document
function isUserLogged()
{
	var db = window.openDatabase("test", "1.0", "iapTest", 200000);
	db.transaction(checkUser, errorCB, successCB);
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
	alert(result.rows.length);
	if(result.rows.length > 0)
    	$.mobile.changePage('main.html','slide');
	else
		$.mobile.changePage('login.html','slide');
}

function successCB() {
    alert("success!");
}