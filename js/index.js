// JavaScript Document
function isUserLogged()
{
	alert("Asdfasdf");
	var db = window.openDatabase("test", "1.0", "iapTest", 200000);
	db.transaction(checkUser, errorCB, successCB);
}

function checkUser(tx) {
	tx.executeSql('SELECT * FROM usuario', [], successQuery, errorCB);	
}

function errorCB(err) {
    $.mobile.changePage('login.html','slide');
}

function successQuery(tx, result) {
	alert(result.rows.length);
	if(result.rows.length > 0)
    	$.mobile.changePage('main.html','slide');
	else
		$.mobile.changePage('login.html','slide');
}

function successCB() {
    //alert("success!");
}