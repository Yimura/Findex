<?php
if (!isset($_SESSION)) {
    session_start();
}

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

            $query = "SELECT primaryStorageSize FROM settings";
            $result = $conn->query($query);
            while ($item = $result->fetch_assoc()) {
                $maxStorage = $item['primaryStorageSize'];
            }

            $userRemainingStorage = $maxStorage - $usedPrimaryStorage;
        }
        else {
            $query = "SELECT * FROM userpath WHERE uid='$uid' AND pid LIKE '$activePathId'";
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
?>
