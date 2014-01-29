<?php
// nos  conectamos a ejemplo.com y al puerto 3307
$enlace = mysql_connect('localhost',  'root', '');
if  (!$enlace) {
    die('No pudo conectarse: ' . mysql_error());
}

$conexion = mysql_select_db('test',$enlace);

$query = "SELECT * FROM usuario WHERE usuario = '".$_POST['usuario']."' AND pw = '".$_POST['pw']."'";

$result = mysql_query($query, $enlace);

echo mysql_num_rows($result);

?>