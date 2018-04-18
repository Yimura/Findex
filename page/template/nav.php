<nav class="uk-navbar uk-navbar-container">
    <div class="uk-margin-left uk-margin-right uk-flex uk-flex-middle fi-logo">
        Findex
    </div>
    <?php if (!$isGuest) { ?>
    <div class="uk-navbar-left">
        <ul class="uk-navbar-nav">
            <li>
                <a class="dropdown-sibling">New</a>
                <div class="uk-navbar-dropdown  uk-navbar-dropdown-bottom-center dropdown-fix">
                    <ul class="uk-nav uk-navbar-dropdown-nav">
                        <li><a class="uk-link-reset" href="#"><span uk-icon="plus"></span><span class="uk-icon-button uk-margin-small-right" uk-icon="copy"></span>New File</a></li>
                        <li><a class="uk-link-reset" href="#"><span uk-icon="plus"></span><span class="uk-icon-button uk-margin-small-right" uk-icon="folder"></span>New Folder</a></li>
                        <li class="uk-nav-divider"></li>
                        <li><a class="uk-link-reset" href="#modal-upload" uk-toggle><span class="uk-margin-small-right" uk-icon="upload"></span>Upload File</a></li>
                    </ul>
                </div>
            </li>
            <li>
                <a class="dropdown-sibling">Actions</a>
                <div class="uk-navbar-dropdown  uk-navbar-dropdown-bottom-center dropdown-fix">
                    <ul class="uk-nav uk-navbar-dropdown-nav">
                        <li><a id="select-all" class="uk-link-reset"><span class="uk-margin-small-right" uk-icon="copy"></span>(De)Select All</a></li>
                        <li class="uk-nav-divider"></li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
    <?php } ?>
    <div class="uk-navbar-right">
        <ul class="uk-navbar-nav">
            <?php if ($activePathId != 0) { ?>
            <li>
                <a class="dropdown-sibling">Storage</a>
                <div class="uk-navbar-dropdown  uk-navbar-dropdown-bottom-center dropdown-fix">
                    <ul class="uk-nav uk-navbar-dropdown-nav">
                        <?php
                        if (!$isGuest) {
                            $i = 1;
                            $query = "SELECT * FROM userPath WHERE uid='$uid'";
                            $result = $conn->query($query);
                            while ($item = $result->fetch_assoc()) {
                                $path       = $item['path'];
                                $pathName   = $item['pathName'];
                                $usedStorage= $item['usedStorage'];
                                $maxStorage = $item['maxStorage'];
                                if ($i >= 2) {
                        ?>
                        <li class="uk-nav-divider"></li><?php } ?>
                        <li><a href="#"><span class="uk-margin-small-right" uk-icon="user"></span><?php echo $storageName; ?></a></li>
                        <?php $i++; } } ?>
                    </ul>
                </div>
            </li>
            <?php } ?>
            <li>
                <a class="dropdown-sibling"><?php echo $username; ?><span class="uk-margin-left uk-margin-large-right"><img class="uk-preserve-width uk-border-circle" src="<?php echo $relativePath; ?>img/avatar.png" width="35" alt=""></span></a>
                <div class="uk-navbar-dropdown  uk-navbar-dropdown-bottom-center dropdown-fix">
                    <ul class="uk-nav uk-navbar-dropdown-nav">
                        <?php if (!$isGuest) { ?>
                        <li><a href="#"><span class="uk-margin-small-right" uk-icon="user"></span>Profile</a></li>
                        <li class="uk-nav-divider"></li>
                        <li><a href="#"><span class="uk-margin-small-right" uk-icon="list"></span>My Uploads</a></li>
                        <li class="uk-nav-divider"></li>
                        <li><a href="#"><span class="uk-margin-small-right" uk-icon="settings"></span>Settings</a></li>
                        <li><a href="#"><span class="uk-margin-small-right" uk-icon="cog"></span>Admin Panel</a></li>
                        <li class="uk-nav-divider"></li>
                        <?php } ?>
                        <li><a id="user-logout"><span class="uk-margin-small-right" uk-icon="sign-out"></span>Logout</a></li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</nav>
