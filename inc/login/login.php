<?php
session_start();

if (isset($_POST['guest'])) {
    if ($_POST['guest']) {
        $_SESSION['uid'] = "-1";
        setcookie('isLoggedIn', true, time() + 86400, "/");
        die(true);
    }
}
else {
    if (isset($_POST['username']) && isset($_POST['password'])) {
        require '../db_connect.php';

        $user = $_POST['username'];
        $pass = $_POST['password'];

        $loginCheck = "SELECT * FROM users WHERE username='$user'";
        $result = $conn->query($loginCheck);

        if (mysqli_num_rows($result) == 0) {
            die("3");
        }

        while ($items = $result->fetch_assoc()) {
            $uid        = $items['uid'];
            $username   = $items['username'];
            $password   = $items['password'];
        }

        if (password_verify($pass, $password)) {
            $_SESSION['uid'] = $uid;
            setcookie('isLoggedIn', true, time() + 86400, "/");
            die(true);
        }
        else {
            die("2");
        }
    }
}
?>
