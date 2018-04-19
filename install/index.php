<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Installation | AH</title>

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
        <script src="js/ah-install.js"></script>
        <script src="../js/ah/ah-footer-control.js"></script>
    </head>
    <body>
        <header class="uk-margin-medium-bottom" uk-grid>
            <div class="ah-logo-big uk-margin-left">
                Auction House
            </div>
            <div class="uk-margin-large-right uk-align-center">
                <ul class="uk-breadcrumb">
                    <!-- bread-* stands for each page -->
                    <li id="bread-1">Introduction</li>
                    <li id="bread-2" class="ah-disabled">Basics</li>
                    <li id="bread-3" class="ah-disabled">Database</li>
                </ul>
            </div>
        </header>
        <section class="uk-align-center uk-card uk-card-default uk-width-1-2@m">
            <div class="uk-card-header">
                <div class="uk-grid-small uk-flex-middle" uk-grid>
                    <div class="uk-width-auto ah-install-step">
                        Introduction
                    </div>
                    <div class="uk-width-expand">
                        <h3 class="uk-card-title uk-margin-remove-bottom uk-align-right">Installation</h3>
                        <p id="page-counter" class="uk-text-meta uk-margin-remove-top ah-page-pos">PAGE 1</p>
                    </div>
                </div>
            </div>
            <div class="uk-card-body">
                <!-- This form has to cover everything to make an all in one post -->
                <form action="index.html" method="post">
                    <ul id="install-switcher" class="ah-hide-list uk-margin">
                        <li class="pos-absolute">
                            <article class="uk-article">
                                <p class="uk-text-lead">You're about to install Auction House on your host.</p>
                                <p class="uk-article-meta uk-align-right">Release: V1.0.0 on 16/03/2018</p>
                                <p>
                                    What you can do by installing Auction House
                                    <ul>
                                        <li>Let your community buy and sell items.</li>
                                        <li>All data is synced the moment you buy something.</li>
                                    </ul>
                                </p>
                            </article>
                        </li>
                        <li class="pos-absolute">
                            <p class="uk-text-lead">Basics</p>
                            <p>
                                Basic settings like community name
                            </p>
                            <input class="uk-input uk-form-blank uk-form-width-medium" type="text" placeholder="Community Name">
                        </li>
                        <li class="pos-absolute">
                            <p class="uk-text-lead">Database Setup</p>
                            <p>
                                Please fill in your database settings below.
                            </p>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="uk-card-footer">
                <ul class="uk-nav" uk-grid>
                    <li class="uk-width-expand@m"><a id="button-left" href="#" class="uk-button uk-button-text ah-disabled uk-align-left"><span uk-icon="chevron-left"></span>Previous</a></li>
                    <li class="uk-align-right uk-margin-medium-right"><a id="button-right" href="#" class="uk-button uk-button-text">Next Step<span uk-icon="chevron-right"></span></a></li>
                </ul>
            </div>
        </section>
    </body>
</html>
