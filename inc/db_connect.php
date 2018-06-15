<?php
$host_name = "localhost";
$db_name = "fileManager";
$db_username = "phpmyadmin";
$db_password = "andreasma2013";

// Create connection
$conn = new mysqli($host_name, $db_username, $db_password, $db_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
