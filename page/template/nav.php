<div class="main-file-wrapper uk-offcanvas-content">
    <!-- DESKTOP NAVBAR -->
    <nav class="uk-navbar uk-navbar-container desktop-nav">
        <div class="uk-margin-left uk-margin-right uk-flex uk-flex-middle fi-logo">
            <a class="uk-link-reset" href="./">
                Findex
            </a>
        </div>
        <?php if (!$isGuest) { ?>
        <div class="uk-navbar-left">
            <ul class="uk-navbar-nav">
                <li>
                    <a class="dropdown-sibling">New</a>
                    <div class="uk-navbar-dropdown dropdown-fix">
                        <ul class="uk-nav uk-navbar-dropdown-nav">
                            <li><a class="uk-link-reset" href="#"><span uk-icon="plus"></span><span class="uk-icon-button uk-margin-small-right" uk-icon="copy"></span>New File</a></li>
                            <li><a class="uk-link-reset" href="#"><span uk-icon="plus"></span><span class="uk-icon-button uk-margin-small-right" uk-icon="folder"></span>New Folder</a></li>
                            <li class="uk-nav-divider dropdown-divider"></li>
                            <li><a id="upload-modal-trigger" class="uk-link-reset" href="#modal-upload" uk-toggle><span class="uk-margin-small-right" uk-icon="upload"></span>Upload File</a></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <a class="dropdown-sibling">Actions</a>
                    <div class="uk-navbar-dropdown dropdown-fix">
                        <ul class="uk-nav uk-navbar-dropdown-nav">
                            <li><a id="select-all" class="uk-link-reset"><span class="uk-margin-small-right" uk-icon="copy"></span>De/select All</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        <?php } ?>
        <div class="uk-navbar-right">
            <ul class="uk-navbar-nav">
                <li class="uk-navbar-item">
                    <div class="uk-inline">
                        <a id="navSearch" class="uk-form-icon uk-form-icon-flip" uk-icon="search"></a>
                        <input id="searchBox" class="uk-input" type="text" placeholder="Search">
                        <div id="searchDropdown" class="uk-hidden">
                            <p class="uk-text-center uk-margin-remove-bottom">Waiting for input<span class="uk-margin-left" uk-spinner="ratio: 0.7"></span></p>
                        </div>
                    </div>
                </li>
                <?php if ($activePathId != 0) { ?>
                <li>
                    <a class="dropdown-sibling">Storage</a>
                    <div class="uk-navbar-dropdown dropdown-fix">
                        <ul class="uk-nav uk-navbar-dropdown-nav">
                            <?php
                            if (!$isGuest) {
                                $i = 1;
                                $query = "SELECT * FROM userpath WHERE uid='$uid'";
                                $result = $conn->query($query);
                                while ($item = $result->fetch_assoc()) {
                                    $path       = $item['path'];
                                    $pathName   = $item['pathName'];
                                    $usedStorage= $item['usedStorage'];
                                    $maxStorage = $item['maxStorage'];
                                    if ($i >= 2) {
                            ?>
                            <li class="uk-nav-divider dropdown-divider"></li><?php } ?>
                            <li>
                                <a href="#" uk-grid>
                                    <p class="uk-text-right storage-name">
                                        <img class="uk-align-left storage-icon" width="40px" src="<?php echo $relativePath; ?>img/hdd.png" alt="">
                                        <?php echo $pathName; ?>
                                    </p>
                                    <p class="uk-text-right uk-text-meta storage-left uk-margin-remove-top"><?php echo formatFileSize($usedStorage); ?> / <?php echo formatFileSize($maxStorage); ?></p>
                                </a>
                            </li>
                            <?php $i++; } } ?>
                        </ul>
                    </div>
                </li>
                <?php } ?>
                <li>
                    <a class="dropdown-sibling"><?php echo $username; ?><span class="uk-margin-left uk-margin-large-right"><img class="uk-preserve-width uk-border-circle" src="<?php echo $relativePath; ?>img/avatar.png" width="35" alt=""></span></a>
                    <div class="uk-navbar-dropdown dropdown-fix">
                        <ul class="uk-nav uk-navbar-dropdown-nav">
                            <?php if (!$isGuest) { ?>
                            <li><a href="#"><span class="uk-margin-small-right" uk-icon="user"></span>Profile</a></li>
                            <li class="uk-nav-divider dropdown-divider"></li>
                            <li><a href="#"><span class="uk-margin-small-right" uk-icon="list"></span>My Uploads</a></li>
                            <li class="uk-nav-divider dropdown-divider"></li>
                            <li><a href="#"><span class="uk-margin-small-right" uk-icon="settings"></span>Settings</a></li>
                            <li><a href="#"><span class="uk-margin-small-right" uk-icon="cog"></span>Admin Panel</a></li>
                            <li class="uk-nav-divider dropdown-divider"></li>
                            <?php } ?>
                            <li><a id="user-logout"><span class="uk-margin-small-right" uk-icon="sign-out"></span>Logout</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
    <!-- MOBILE NAVBAR -->
    <nav class="uk-navbar uk-navbar-container mobile-nav">
        <div class="uk-margin-left uk-margin-right uk-flex uk-flex-middle fi-logo">
            <a class="uk-link-reset" href="./">
                Findex
            </a>
        </div>
        <div class="uk-navbar-right uk-light">
            <a class="uk-navbar-toggle uk-margin-small-right" uk-toggle="target: #mobile-navbar">
                <span>MENU</span><span class="uk-margin-small-left" uk-navbar-toggle-icon></span>
            </a>
        </div>
    </nav>
    <div id="mobile-navbar" uk-offcanvas="mode: push; flip: false;">
        <div class="uk-offcanvas-bar">
            <section class="user-navbar">
                <p class="uk-align-center">
                    <?php echo $username; ?>
                    <span class="uk-margin-left">
                        <img class="uk-preserve-width uk-border-circle" src="<?php echo $relativePath; ?>img/avatar.png" width="35" alt="">
                    </span>
                </p>
                <nav>

                    <ul class="uk-navbar-nav">
                        <li>
                            <a href="#">Item</a>
                            <div class="">
                                <ul class="uk-nav uk-navbar-dropdown-nav">
                                    <li class="uk-active"><a href="#">Active</a></li>
                                    <li><a href="#">Item</a></li>
                                    <li class="uk-nav-header">Header</li>
                                    <li><a href="#">Item</a></li>
                                    <li><a href="#">Item</a></li>
                                    <li class="uk-nav-divider"></li>
                                    <li><a href="#">Item</a></li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <a href="#">Item</a>
                            <div class="">
                                <div class="">
                                    <div>
                                        <ul class="uk-nav uk-navbar-dropdown-nav">
                                            <li class="uk-active"><a href="#">Active</a></li>
                                            <li><a href="#">Item</a></li>
                                            <li class="uk-nav-header">Header</li>
                                            <li><a href="#">Item</a></li>
                                            <li><a href="#">Item</a></li>
                                            <li class="uk-nav-divider"></li>
                                            <li><a href="#">Item</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>
            </section>
        </div>
    </div>
