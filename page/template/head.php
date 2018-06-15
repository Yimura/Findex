<!DOCTYPE html>
<html lang="en" dir="ltr">
    <!-- This product is licensed under the MIT license see https://github.com/Y1mura/FileIndexer for details
        __  ___
        \ \/ (_)___ ___  __  ___________ _
         \  / / __ `__ \/ / / / ___/ __ `/
         / / / / / / / / /_/ / /  / /_/ /
        /_/_/_/ /_/ /_/\__,_/_/   \__,_/
    -->
    <head>
        <meta charset="utf-8">
        <title>File Indexer: <?php echo $urlPath; ?></title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no">
        <meta name="theme-color" content="#1e87f0">

        <link rel="stylesheet" href="<?php echo $relativePath; ?>css/master.css">
        <link rel="stylesheet" href="<?php echo $relativePath; ?>css/uikit-reset.css">
        <link rel="stylesheet" href="<?php echo $relativePath; ?>css/mobile.css">

        <!-- UiKit CSS & JS -->
        <link rel="stylesheet" href="<?php echo $relativePath; ?>css/uikit.min.css" />

        <script src="<?php echo $relativePath; ?>js/sources/uikit.min.js"></script>
        <script src="<?php echo $relativePath; ?>js/sources/uikit-icons.min.js"></script>

        <!-- JQuery JS -->
        <script src="<?php echo $relativePath; ?>js/sources/jquery-3.3.1.min.js"></script>
        <!-- Cookies JS -->
        <script src="<?php echo $relativePath; ?>js/sources/js-cookie.js"></script>

        <!-- Basic content setup -->
        <script src="<?php echo $relativePath; ?>js/content/get-homedir.js"></script>
        <!-- Opening directory -->
        <script src="<?php echo $relativePath; ?>js/content/open-dir.js"></script>
        <!-- Files JS -->
        <script src="<?php echo $relativePath; ?>js/files/show-item-info.js"></script>
        <script src="<?php echo $relativePath; ?>js/files/copy-2-clipboard.js"></script>
        <!-- Login JS -->
        <script src="<?php echo $relativePath; ?>js/login/form.js"></script>
        <script src="<?php echo $relativePath; ?>js/login/logout.js"></script>
        <!-- Hide public folder alert -->
        <script src="<?php echo $relativePath; ?>js/files/hide-alert.js"></script>
        <!-- Navbar Fix JS -->
        <script src="<?php echo $relativePath; ?>js/sources/dropdown-fix.js"></script>

        <?php if (!$isGuest) { ?>
        <!-- Upload files to the server -->
        <script src="<?php echo $relativePath; ?>js/upload-file.js"></script>
        <script src="<?php echo $relativePath; ?>js/files/remove-file.js"></script>
        <!-- Check all items in file-manager -->
        <script src="<?php echo $relativePath; ?>js/files/check-files.js"></script>
        <?php } ?>
    </head>
    <body>
