<?php
session_start();

if (isset($_POST['logout'])) {
    if ($_POST['logout'] == true) {
        setcookie('isLoggedIn', '', time() - (86400 * 365), "/");
        setcookie('setup', '', time() - (86400 * 365), "/");
        session_unset();
        session_destroy();
        die(true);
    }
    else {
        die("2");
    }
}
?>
