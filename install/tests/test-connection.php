<?php
if (!isset($_POST['dbhost']) || !isset($_POST['dbname']) || !isset($_POST['dbuser']) || !isset($_POST['dbpass'])) {
    die("-1");
}

$dbhost = $_POST['dbhost'];
$dbname = $_POST['dbname'];
$dbuser = $_POST['dbuser'];
$dbpass = $_POST['dbpass'];

if ($_POST['dbport'] != "") {
    $dbport = $_POST['dbport'];
}
else {
    $dbport = 3306;
}

$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname, $dbport);

if (!$conn) {
    die(false);
}

$checkdbname = mysqli_select_db($conn, $dbname);
if (!$checkdbname)
{
    die(false);
}

if ($conn->connect_error) {
    die(false);
}
else {
    die(true);
}
?>
