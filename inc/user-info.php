<?php
if (isset($_SESSION['uid'])) {
    if ($_SESSION['uid'] != "-1") {
        require 'db_connect.php';

        $uid = $_SESSION['uid'];

        $query = "SELECT * FROM users WHERE uid='$uid'";
        $result = $conn->query($query);
        while ($item = $result->fetch_assoc()) {
            $username            = $item['username'];
            $role                = $item['role'];
            $activePathId        = $item['activePathId'];
            $usedPrimaryStorage  = $item['usedPrimaryStorage'];
        }

        if ($activePathId == 0) {
            $activePath = "primary/";
            $pathMode   = 0;
            $pathName   = "Primary Storage";

            $query = "SELECT * FROM settings";
            $result = $conn->query($query);
            while ($item = $result->fetch_assoc()) {
                $maxStorage = $item['primaryStorageSize'];
            }

            $userRemainingStorage = $maxStorage - $usedPrimaryStorage;
        }
        else {
            $query = "SELECT * FROM userPath WHERE uid='$uid' AND pid LIKE '$activePathId'";
            $result = $conn->query($query);
            while ($item = $result->fetch_assoc()) {
                $activePath     = $item['path'];
                $pathName       = $item['pathName'];
                $pathMode       = $item['pathMode'];
                $usedStorage    = $item['usedStorage'];
                $maxStorage     = $item['maxStorage'];
            }

            $userRemainingStorage = $maxStorage - $usedStorage;
        }

        $isGuest = false;
    }
    else {
        $username = "Guest";
        $activePathId = 0;
        $isGuest = true;
    }
}

function checkHomeDir($fncPathMode = 0, $newDir, $fncUsername, $fncActivePath, $fncIsGuest)
{
    if ($fncPathMode == 0) {
        if ($fncIsGuest) {
            $replaceStr = "../../_public/";
        }
        else {
            $replaceStr = "../../_users/";
            $userDir = strtolower($fncUsername)."/".$fncActivePath;
        }
    }
    else if ($fncPathMode == 1) {
        // Users with pathMode 1 are expected to know what they are doing and will not be checked

        $array = [
            'value' => true,
            'path'  => $newDir
        ];

        return $array;
    }
    $checkdir = substr($newDir, strlen($replaceStr), strlen($userDir));

    // Check if the two are the same if they are different then the user must have tampered with the path
    if (strcmp(strtolower($checkdir), strtolower($userDir)) == 0) {
        $array = [
            'value' => true,
            'path'  => $newDir
        ];

        return $array;
    }
    else {
        // We asume user has tampered with the filepath so we send him back to his active storage space

        $array = [
            'value' => false,
            'path'  => $userDir
        ];

        return $array;
    }
}

function folderSize($dir)
{
    $size = 0;
    foreach (glob(rtrim($dir, '/').'/*', GLOB_NOSORT) as $each) {
        $size += is_file($each) ? filesize($each) : folderSize($each);
    }
    return $size;
}
?>
