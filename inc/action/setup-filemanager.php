<?php
session_start();

if (isset($_SESSION['uid'])) {
    require '../user-info.php';
    require '../functions.php';

    if (isset($_POST['setup']) == true && $_SESSION['uid'] != "-1") {
        if (isset($_SESSION['activeDirectory'])) {
            $rootDir = $_SESSION['activeDirectory'];
        }
        else {
            if ($pathMode == 0) {
                $rootDir = "../../_users/". strtolower($username). "/". $activePath;
            }
            else if ($pathMode == 1) {
                $rootDir = $activePath;
            }

            // Keep the current active directory in a session
            $_SESSION['activeDirectory'] = $rootDir;
        }
    }

    else if(isset($_POST['openDir']) && isset($_SESSION['activeDirectory'])) {
        $newDir = $_SESSION['activeDirectory'].$_POST['openDir'];
        if (strlen($_POST['openDir']) > 0) {
            $newDir = $newDir."/";
        }

        if (!file_exists($newDir)) {
            die("2");
        }

        $checkHomeDir = checkHomeDir($pathMode, $newDir, $username, $activePath, $isGuest);

        if ($checkHomeDir['value']) {
            $rootDir = $checkHomeDir['path'];
        }
        else {
            // Value is false here inside our function checkHomeDir we set the original homedir again if the user has tampered with path's (we can add banning later on if needed)
            $rootDir = $checkHomeDir['path'];
        }

        $_SESSION['activeDirectory'] = $rootDir;
    }

    else if (isset($_POST['goupDir']) && isset($_SESSION['activeDirectory'])) {
        $newDir = substr($_SESSION['activeDirectory'], 0, (strlen($_SESSION['activeDirectory'])-strlen(array_slice(explode("/", $_SESSION['activeDirectory']), -2)[0])-1));

        if (!file_exists($newDir)) {
            die("2");
        }

        $checkHomeDir = checkHomeDir($pathMode, $newDir, $username, $activePath, $isGuest);

        if ($checkHomeDir['value']) {
            $rootDir = $checkHomeDir['path'];
        }
        else {
            // Value is false here inside our function checkHomeDir we set the original homedir again if the user has tampered with path's (we can add banning later on if needed)
            $rootDir = $checkHomeDir['path'];
        }

        $_SESSION['activeDirectory'] = $rootDir;
    }
    else if($_SESSION['uid'] == "-1") {
        if (isset($_SESSION['activeDirectory'])) {
            $rootDir = $_SESSION['activeDirectory'];
        }
        else {
            $rootDir = "../../_public/";

            // Keep the current active directory in a session
            $_SESSION['activeDirectory'] = $rootDir;
        }
    }

    if (!file_exists($rootDir)) {
        mkdir($rootDir, 0765, true);
    }
}
else {
    die("1");
}
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://"; // server protocol
$host = $_SERVER['HTTP_HOST'];

$itemId = 0;
$scandir = array_diff(preg_grep('/^([^.])/', scandir($rootDir)), array('.', '..'));

$directories = array();
$files = array();
foreach ($scandir as $item) {
    if (is_dir($rootDir.$item)) {
        $directories[] = $item;
    }
    else {
        $files[] = $item;
    }
}
$scandir = array_merge($directories, $files);

foreach ($scandir as $item) {
    $item = $rootDir.$item;

    $realpath = realpath($item);
    $siteDir = $protocol.$host.str_replace("../..", "", $item);

    if (is_dir($item)) {
        $itemSize = "Dir";
        $itemType = "folder";
        $isDir = true;
    }
    else {
        $itemSize = formatFileSize(filesize($item));
        $itemType = "copy";
        $isDir = false;
    }

    $pathinfo = pathinfo($realpath);
?>
    <tr id="<?php echo $itemId ?>">
        <td class="uk-table-shrink">
            <a id="select_<?php echo $itemId; ?>" href="#">
                <span class="uk-icon-button" uk-icon="<?php echo $itemType; ?>" name="<?php echo $itemType; ?>"></span>
            </a>
        </td>
        <td class="uk-table-link overflow-hidden">
            <div class="uk-grid-collapse" uk-grid>
                <a id="show-item_<?php echo $itemId; ?>" class="uk-link-reset uk-width-auto uk-margin-small-right" href="#file-info-modal" uk-toggle>
                    <span uk-icon="info"></span>
                </a>
                <a <?php if ($isDir) { ?> id="open-dir_<?php echo $itemId; ?>" <?php } else { ?> id="open-file_<?php echo $itemId; ?>" <?php } ?> title="<?php echo $pathinfo['basename']; ?>" class="uk-margin-small-left uk-link-reset uk-width-expand" <?php if (!$isDir) { ?> href="<?php echo $item; ?>"  <?php } ?>>
                    <?php echo $pathinfo['basename']; ?>
                    <input type="hidden" name="serverpath_<?php echo $itemId; ?>" value="<?php echo $siteDir; ?>">
                    <input type="hidden" name="realpath_<?php echo $itemId; ?>" value="<?php echo $realpath; ?>">
                    <input type="hidden" name="basename_<?php echo $itemId; ?>" value="<?php echo $pathinfo['basename']; ?>">
                    <input type="hidden" name="item_<?php echo $itemId; ?>" value="<?php echo $item; ?>">
                </a>
            </div>
        </td>
        <td class="uk-text-center hide-table-row">
            <?php if (!$isGuest) { ?><a class="uk-link-reset"><span uk-icon="file-edit"></span></a>
            <a id="remove-file_<?php echo $itemId; ?>" class="uk-link-reset" href="#modal-confirm" uk-toggle><span uk-icon="trash"></span></a><?php } ?>
            <a id="copy-link_<?php echo $itemId; ?>" class="uk-link-reset"><span title="Copy filelink to clipboard" uk-icon="link"></span></a>
            <a <?php if (!is_dir($item)) { ?>id="download-dir_<?php echo $itemId; ?>"<?php } ?> class="uk-link-reset" href="<?php echo str_replace(" ", "%20", $item); ?>" title="Download item" <?php if (!is_dir($item)) { ?>download<?php } ?>><span uk-icon="download"></span></a>
        </td>
        <td class="uk-table-shrink uk-text-nowrap uk-text-center"><?php echo $itemSize; ?></td>
    </tr>
<?php
$itemId++;
}
?>
