<?php
session_start();
require '../user-info.php';

if ($isGuest) {
    die("1");
}

require '../functions.php';

$directoryUsage = updateUserRemainingStorage(); // Check functions.php file
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
$query = "SELECT disallowed FROM settings";
$result = $conn->query($query);
while ($item = $result->fetch_assoc()) {
    $disallowed = explode(",", $item['disallowed']);
    foreach ($disallowed as $item) {
        if($fileType == $item) {
            die("4");
        }
    }
}


if (move_uploaded_file($_FILES["files"]["tmp_name"][0], $target_file)) {
    // Update storage usage of user
    updateUserRemainingStorage();

    die("5");
} else {
    die("6");
}
?>
