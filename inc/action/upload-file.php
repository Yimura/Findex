<?php
session_start();
require '../user-info.php';
require '../db_connect.php';

if ($isGuest) {
    die("1");
}

// We have to calculate and update a user his remaining storage
if ($pathMode == 0) {
    $userDir = "../../_users/". strtolower($username). "/". $activePath;
    $directoryUsage = folderSize($userDir);
}
else {
    $userDir = $activePath;
    $directoryUsage = folderSize($userDir);
}

die($directoryUsage);
if ($activePathId == 0)
{
    $query = "UPDATE users SET usedPrimaryStorage='$directoryUsage' WHERE username='$username'";
    $conn->query($query);
}
else {
    $query = "UPDATE userPath SET usedStorage='$directoryUsage' WHERE pid='$activePathId'";
    $conn->query($query);
}

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$userRemainingStorage = $maxStorage - $directoryUsage;

$target_dir = $_SESSION['activeDirectory'];
$target_file = $target_dir . basename($_FILES["files"]["name"][0]);
$fileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// Check if file already exists
if (file_exists($target_file)) {
    die("2");
}

// Check file size
if ($_FILES["files"]["size"][0] > $userRemainingStorage || $_FILES["files"]["size"][0] < 50) {
    // File too larger or too small, too small is to prevent file flooding with dummy files
    die("3");
}
// Allow certain file formats
if($fileType == "html" && $fileType == "php") {
    die("4");
}


if (move_uploaded_file($_FILES["files"]["tmp_name"][0], $target_file)) {
    die("5");
} else {
    die("6");
}
?>
