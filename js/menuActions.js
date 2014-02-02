// JavaScript Document
$(document).ready(function(){
	$('#mainPage').click(function(events){
		$.ajax({
			type : 'POST',           
			url : 'principal.html',
			beforeSend: function(){
				$('#loading').show();
			},
			success : function(data) {
					$('#contenido_pagina').html(data);
					$('#mainPage').addClass('ui-btn-active');
					$('#datosPersonales').removeClass('ui-btn-active');
					//$.mobile.changePage('#login');
					$('#loading').hide();
			},
			error : function(xhr, type) {
				alert('server error occurred');
				$('#loading').hide();
			}
		});
	});
	
	$('#datosPersonales').click(function(events){
		$.ajax({
			type : 'POST',           
			url : 'infoUsuario.html',
			beforeSend: function(){
				$('#loading').show();
			},
			success : function(data) {
					$('#contenido_pagina').html(data);
					$('#datosPersonales').addClass('ui-btn-active');
					$('#mainPage').removeClass('ui-btn-active');
					//$.mobile.changePage('#login');
					$('#loading').hide();
			},
			error : function(xhr, type) {
				alert('server error occurred');
				$('#loading').hide();
			}
		});
	});
});