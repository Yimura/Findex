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
if (!file_exists($target_dir)) {
    if(!mkdir($target_dir, 0765, true))
    {
        die("8");
    }
}

$filecount = count($_FILES["files"]["name"]);
for ($i=0; $i < $filecount; $i++) {
    $target_file = $target_dir . basename($_FILES["files"]["name"][$i]);
    $fileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Check if file already exists
    if (file_exists($target_file)) {
        if ($filecount > 1) {
            $error = "7";
        }
        else {
            die("2");
        }
    }

    // Check file size
    if ($_FILES["files"]["size"][$i] > $userRemainingStorage || $_FILES["files"]["size"][$i] < 50) {
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
                if ($filecount > 1) {
                    $error = "7";
                }
                else {
                    die("4");
                }
            }
        }
    }


    if (move_uploaded_file($_FILES["files"]["tmp_name"][$i], $target_file)) {
        if ($filecount == $i+1) {
            // Update storage usage of user
            updateUserRemainingStorage();

            if (isset($error)) {
                die($error);
            }
            die("5");
        }
    } else {
        die("6");
    }
}
?>
