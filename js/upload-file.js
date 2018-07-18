$(document).ready(function() {
    var
        dragcount = 0,
        droppedfiles,
        upload = null;

    $(window)
        .bind("dragenter", function() {
            if (!$("#modal-upload").hasClass("uk-open")) {
                UIkit.toggle("#modal-upload").toggle();
            }
        });


    $('.upload-zone').on("dragenter dragstart dragend dragleave dragover drag drop", function (e) {
        e.preventDefault();
    });

    $(document)
        .on('dragenter','.upload-zone', function() {
            dragcount++;
            $(this).css({
                boxShadow: '0px 0px 20px 0px #323232'
            });
        })
        .on('dragleave','.upload-zone', function() {
            dragcount--;
            if (dragcount === 0) {
                $(this).css("box-shadow", "");
            }
        })
        .on('drop', '.upload-zone', function(e) {
            e.preventDefault();

            $(this).css("box-shadow", "");

            droppedfiles = e.originalEvent.dataTransfer.files;

            var form = new FormData();

            for (var i = 0; i < droppedfiles.length; i++) {
                form.append('files[]', droppedfiles[i]);
            }

            Upload(form);

            return false;
        });

    $('#upload-close').click(function() {
        if (upload != null) {
            $('#upload-progressbar2').parent().removeAttr("hidden");
        }
    });

    $('#upload-modal-trigger').click(function() {
        if (!$('#upload-progressbar2').parent()[0].hasAttribute("hidden")) {
            $('#upload-progressbar2').parent().attr("hidden", "");
        }
    });

    $('#upload-abort').click(function() {
        if (upload != null) {
            upload.abort();
            UIkit.notification({
                message: '<span class="uk-margin-right" uk-icon="check"></span>Upload successfully aborted',
                status: 'success',
                pos: 'top-center',
                timeout: 2500
            });
            upload = null;
        }
    });

    $('.upload-zone input[type="file"]').change(function() {
        var form = new FormData();
        for (var i = 0; i < $(this).get(0).files.length; i++) {
            form.append('files[]', $(this).get(0).files[i]);
        }

        Upload(form);
    });

    function Upload(data) {
        upload = $.ajax({
            type: 'POST',
            url: '/inc/action/upload-file.php',
            data: data,
            processData: false,
            contentType: false,
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                // Upload progress
                xhr.upload.addEventListener("progress", function(evt){
                    if (evt.lengthComputable) {
                        var percentComplete = (evt.loaded / evt.total) * 100;
                        /* Debugging
                        if (percentComplete >= 100) {
                            console.log("Page request SENT");
                        }*/
                        $('#upload-progressbar').val(percentComplete);
                        $('#upload-progressbar2').val(percentComplete);
                    }
                }, false);

                return xhr;
            },
            beforeSend: function() {
                $('#upload-progressbar').removeAttr("hidden");

                // Show "Are you sure you want to leave this page" message to user when uploading
                window.onbeforeunload = function() {
                    return true;
                };
            },
            success: function(data) {
                UiKitNotification(data);
            },
            complete:function() {
                setTimeout(function () {
                    $('#upload-progressbar').attr("hidden", "");
                    $('#upload-progressbar2').parent().attr("hidden", "");
                }, 500);

                // Reset "Are you sure you want to leave this page" message
                window.onbeforeunload = null;
            }
        });
    }

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

            ReloadFiles();
            upload = null;
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
