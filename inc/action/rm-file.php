<?php
session_start();

if ($_SESSION['uid'] != "-1") {
    if (isset($_POST['realpath'])) {
        $item = $_POST['realpath'];
        if (!is_writable($item)) {
            if (!chown($item, "www-data") || !chmod($item, 0777)) {
                die("3");
            }
        }
    }
    else {
        die("4");
    }

    require '../functions.php';

    $permanent = $_POST['permanent'];
    if ($permanent) {
        if (is_dir($item)) {
            if (rrmdir($item)) {
                die("7");
            }
            else {
                die("8");
            }
        }
        else {
            if(unlink($item))
            {
                require '../user-info.php';

                updateUserRemainingStorage();

                die("2");
            }
            else {
                die("5");
            }
        }
    } else {
        /*if(!is_dir("/trashbin/"))
        {
            mkdir("/trashbin/", 0755, false);
        }

        if (rename()) {
            # code...
        }*/
        die("1");
    }
}
else {
    die("6");
}
?>
