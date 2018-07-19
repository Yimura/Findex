<?php
session_start();

if(isset($_POST['openFile'])) {
    $newDir = $_SESSION['activeDirectory'].$_POST['openDir']."/";
    if (!file_exists($newDir)) {
        die("2");
    }
    if ($pathMode == 0) {
        if ($_SESSION['uid'] == "-1") {
            // Will have to find something for public later on
            $replaceStr = "../../_public/";
        }
        else {
            $replaceStr = "../../_users/";
            $userDir = strtolower($username)."/".$activePath;
        }
    }
    $checkdir = substr($newDir, strlen($replaceStr), strlen($userDir));
    if (strcmp(strtolower($checkdir), strtolower($userDir)) == 0) {
        $rootDir = $newDir;
    }
    else {
        $rootDir = $userDir;
    }
}
?>
