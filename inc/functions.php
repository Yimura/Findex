<?php
function formatFileSize($bytes)
    {
        if ($bytes >= 1099511627776) {
            $bytes = number_format($bytes / 1099511627776, 2) . ' TB';
        }
        elseif ($bytes >= 1073741824)
        {
            $bytes = number_format($bytes / 1073741824, 2) . ' GB';
        }
        elseif ($bytes >= 1048576)
        {
            $bytes = number_format($bytes / 1048576, 2) . ' MB';
        }
        elseif ($bytes >= 1024)
        {
            $bytes = number_format($bytes / 1024, 2) . ' KB';
        }
        elseif ($bytes > 1)
        {
            $bytes = $bytes . ' bytes';
        }
        elseif ($bytes == 1)
        {
            $bytes = $bytes . ' byte';
        }
        else
        {
            $bytes = '0 bytes';
        }

        return $bytes;
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
            'path'  => "../../_users/".$userDir
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

function updateUserRemainingStorage()
{
    // user info internally calls the database connection
    require 'user-info.php';

    // We have to calculate and update a user his remaining storage
    if ($pathMode == 0) {
        $userDir = "../../_users/". strtolower($username). "/". $activePath;
        $directoryUsage = folderSize($userDir);
    }
    else {
        $userDir = $activePath;
        $directoryUsage = folderSize($userDir);
    }

    if ($activePathId == 0)
    {
        $query = "UPDATE users SET usedPrimaryStorage='$directoryUsage' WHERE username='$username'";
        $conn->query($query);
    }
    else {
        $query = "UPDATE userpath SET usedStorage='$directoryUsage' WHERE pid='$activePathId'";
        $conn->query($query);
    }

    return $directoryUsage;
}

function rrmdir($dir) {
   if (is_dir($dir))
   {
        $objects = scandir($dir);
        foreach ($objects as $object) {
            if ($object != "." && $object != "..") {
                if (is_dir($dir."/".$object))
                {
                    rrmdir($dir."/".$object);
                }
                else
                {
                    unlink($dir."/".$object);
                }
            }
        }
        rmdir($dir);
    }
}
?>
