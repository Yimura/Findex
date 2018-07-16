$(document).ready(function() {
    $(window).bind("dragenter", function() {
        if (!$("#modal-upload").hasClass("uk-open")) {
            UIkit.toggle("#modal-upload").toggle();
        }
    });

    var bar = document.getElementById('upload-progressbar');

    UIkit.upload('.js-upload', {

        url: '/inc/action/upload-file.php',
        multiple: true,

        complete: function (event) {
            console.log(event);
            UiKitNotification(event.response);
        },

        loadStart: function (e) {
            bar.removeAttribute('hidden');
            bar.max = e.total;
            bar.value = e.loaded;
        },

        progress: function (e) {

            bar.max = e.total;
            bar.value = e.loaded;
        },

        loadEnd: function (e) {

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
                message: '<span class="uk-margin-right" uk-icon="ban"></span>Guests aren\'t allowed to upload!?',
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
                message: '<span class="uk-margin-right" uk-icon="ban"></span>Storage full or file too small!',
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
        else if (succ == "7") {
            UIkit.notification({
                message: '<span class="uk-margin-right" uk-icon="ban"></span>Some files conflicted!',
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
