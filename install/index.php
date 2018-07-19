<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Installation | Findex</title>

        <link rel="icon" href="../img/favicon.png" type="image/x-icon" />
        <link rel="shortcut icon" href="../img/favicon.png" type="image/x-icon" />

        <!-- Global CSS -->
        <link rel="stylesheet" href="../css/master.css">
        <!-- Installation Specific CSS -->
        <link rel="stylesheet" href="css/master.css">

        <!-- UIkit CSS -->
        <link rel="stylesheet" href="../css/uikit.min.css" />
        <!-- UIkit JS -->
        <script src="../js/sources/uikit.min.js"></script>
        <script src="../js/sources/uikit-icons.min.js"></script>
        <!-- JQuery JS -->
        <script src="../js/sources/jquery-3.3.1.min.js"></script>

        <!-- Our Own JS -->
        <script src="js/install.js"></script>
        <script src="js/verify-db.js"></script>
    </head>
    <body>
        <header class="uk-margin-medium-bottom" uk-grid>
            <div class="logo-big uk-margin-left">
                Findex
            </div>
            <div class="uk-margin-large-right uk-align-center">
                <ul class="uk-breadcrumb">
                    <!-- bread-# stands for each page -->
                    <li id="bread-1">Introduction</li>
                    <li id="bread-2" class="disabled">Basics</li>
                    <li id="bread-3" class="disabled">Database</li>
                    <li id="bread-4" class="disabled">Admin</li>
                </ul>
            </div>
        </header>
        <section class="uk-align-center uk-card uk-card-default uk-width-1-2@m">
            <div class="uk-card-header">
                <div class="uk-grid-small uk-flex-middle" uk-grid>
                    <div class="uk-width-auto install-step">
                        Introduction
                    </div>
                    <div class="uk-width-expand">
                        <div class="uk-align-right uk-margin-remove-bottom uk-grid-collapse" uk-grid>
                            <h3 class="uk-card-title">Installation</h3>
                            <p id="page-counter" class="uk-text-meta">PAGE 1</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="uk-card-body">
                <!-- This form has to cover everything to make an all in one post -->
                <form action="index.html" method="post">
                    <ul id="install-switcher" class="hide-list uk-margin">
                        <li class="pos-absolute">
                            <article class="uk-article">
                                <p class="uk-text-lead">You're about to install Findex on your host.</p>
                                <p class="uk-article-meta uk-align-right">Release: V0.1.0 on 15/06/2018</p>
                                <p>
                                    What you can do by installing Findex on your host
                                    <ul>
                                        <li>Upload, remove, rename,... files</li>
                                        <li>User based storage spaces</li>
                                        <li>Limit a user to its max. allowed storage space</li>
                                        <li>Have multiple storages. Based on machine path or just the user directory</li>
                                        <li>Fast and elegant, data is fetched in the background</li>
                                    </ul>
                                </p>
                            </article>
                        </li>
                        <li class="pos-absolute">
                            <p class="uk-text-lead">Basics</p>
                            <p>
                                Basic settings
                            </p>
                            <input class="uk-input uk-margin-small-bottom uk-form-width-medium" type="text" placeholder="Owner Name">
                            <br>
                            <input class="uk-input uk-form-width-large" type="text" placeholder="Default user storage space (in bytes)">
                            <p>
                                Enable guest mode:
                                <label class="uk-margin-small-left"><input class="uk-radio" type="radio" name="guest" value="1"> On</label>
                                <label><input class="uk-radio" type="radio" name="guest" value="0" checked> Off</label>
                            </p>
                        </li>
                        <li class="pos-absolute">
                            <p class="uk-text-lead">Database Setup</p>
                            <p>
                                Please fill in your database settings below.
                            </p>
                            <div class="db-padding  uk-margin-remove-top" uk-grid>
                                <input id="db-host" class="uk-input uk-margin-remove-top uk-margin-small-bottom uk-width-2-3" type="text" name="db-host" placeholder="Host: db.example.com">
                                <input id="db-port" class="uk-input uk-margin-remove-top uk-width-1-3" type="text" name="db-port" placeholder="Port - Empty for default">
                                <input id="db-name" class="uk-input uk-margin-remove-top uk-margin-small-bottom" type="text" name="db-user" placeholder="Database Name">
                                <input id="db-user" class="uk-input uk-margin-remove-top uk-width-1-2" type="text" name="db-user" placeholder="Database User">
                                <input id="db-pass" class="uk-input uk-margin-remove-top uk-width-1-2" type="password" name="db-pass" placeholder="Database Password">
                            </div>
                            <a id="verify-credentials" class="uk-margin-small-top uk-button uk-button-text"><span class="uk-margin-small-right" uk-icon="check"></span>Verify Credentials</a>
                        </li>
                        <li  class="pos-absolute">
                            <p class="uk-text-lead">Main server admin</p>
                            <p>
                                Fill in these fields to setup the main admin.
                            </p>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="uk-card-footer">
                <ul class="uk-nav" uk-grid>
                    <li class="uk-width-expand@m"><a id="button-left" href="#" class="uk-button uk-button-text disabled uk-align-left"><span uk-icon="chevron-left"></span>Previous</a></li>
                    <li class="uk-align-right uk-margin-medium-right uk-margin-remove-bottom"><a id="button-right" href="#" class="uk-button uk-button-text">Next Step<span uk-icon="chevron-right"></span></a></li>
                </ul>
            </div>
        </section>
    </body>
</html>
