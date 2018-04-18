$(document).ready(function() {
    $(window).bind("dragenter", function() {
        if (UIkit.toggle("#modal-upload", 'hidden')) {
            UIkit.toggle("#modal-upload").toggle();
        }
    });

    var bar = document.getElementById('upload-progressbar');

    UIkit.upload('.js-upload', {

        url: '/inc/action/upload-file.php',
        multiple: false,

        beforeSend: function (e) {
            UiKitNotification(e);
        },
        beforeAll: function (e) {
            UiKitNotification(e);
        },
        load: function (e) {
            UiKitNotification(e);
        },
        error: function (e) {
            UiKitNotification(e);
        },
        complete: function (e) {
            UiKitNotification(e);
        },

        loadStart: function (e) {
            UiKitNotification(e);

            bar.removeAttribute('hidden');
            bar.max = e.total;
            bar.value = e.loaded;
        },

        progress: function (e) {
            UiKitNotification(e);

            bar.max = e.total;
            bar.value = e.loaded;
        },

        loadEnd: function (e) {
            UiKitNotification(e);

            bar.max = e.total;
            bar.value = e.loaded;
        },

        completeAll: function (e) {
            UiKitNotification(e);

            setTimeout(function () {
                bar.setAttribute('hidden', 'hidden');
            }, 1000);
        }

    });

    function UiKitNotification(succ) {
        if (succ == "1") {
            UIkit.notification({
                message: '<span class="uk-margin-right" uk-icon="ban"></span>Guest aren\'t allowed to upload!?',
                status: 'danger',
                pos: 'top-center',
                timeout: 2500
            });
        }
        else if (succ == "2") {
            UIkit.notification({
                message: '<span class="uk-margin-right" uk-icon="ban"></span>File already exists!',
                status: 'danger',
                pos: 'top-center',
                timeout: 2500
            });
        }
        else if (succ == "3") {
            UIkit.notification({
                message: '<span class="uk-margin-right" uk-icon="ban"></span>File is too large or below 50 bytes!',
                status: 'danger',
                pos: 'top-center',
                timeout: 2500
            });
        }
        else if (succ == "4") {
            UIkit.notification({
                message: '<span class="uk-margin-right" uk-icon="ban"></span>This filetype isn\'t allowed!',
                status: 'danger',
                pos: 'top-center',
                timeout: 2500
            });
        }
        else if (succ == "5") {
            UIkit.notification({
                message: '<span class="uk-margin-right" uk-icon="check"></span>Successfully uploaded file!',
                status: 'success',
                pos: 'top-center',
                timeout: 2500
            });
        }
        else if (succ == "6") {
            UIkit.notification({
                message: '<span class="uk-margin-right" uk-icon="ban"></span>Failed to upload file!',
                status: 'danger',
                pos: 'top-center',
                timeout: 2500
            });
        }
        else {
            console.log(succ);
        }
    }
});
