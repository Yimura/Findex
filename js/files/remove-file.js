$(document).ready(function() {
    var lastItemId;

    $(document).on("click", "[id^=remove-file_]", function() {
        var attrId = $(this).attr('id');
        var itemId = attrId.split("_");
        lastItemId = itemId[itemId.length-1];

        var element = "input[name='realpath_" + lastItemId + "'";
        var realpath = $(element).val();

        $('#remove-file-confirm').prop("value", realpath);
    });

    $("#confirm-remove-file").click(function() {
        $.post("/inc/action/rm-file.php",
        {
            realpath: $('#remove-file-confirm').val(),
            permanent: $('#remove-perm').prop('checked')
        },
        function(succ){
            if (succ == "1") {
                $('#' + lastItemId).remove();
                UIkit.toggle("#modal-confirm").toggle();

                UIkit.notification({
                    message: '<span class="uk-margin-right" uk-icon="trash"></span>Binning files is not yet supported...',
                    status: 'success',
                    pos: 'top-center',
                    timeout: 2500
                });
            }
            else if (succ == "2") {
                $('#' + lastItemId).remove();
                UIkit.toggle("#modal-confirm").toggle();

                UIkit.notification({
                    message: '<span class="uk-margin-right" uk-icon="trash"></span>Successfully destroyed files',
                    status: 'success',
                    pos: 'top-center',
                    timeout: 2500
                });
            }
            else if (succ == "3") {
                UIkit.notification({
                    message: '<span class="uk-margin-right" uk-icon="ban"></span>Files are write protected!',
                    status: 'danger',
                    pos: 'top-center',
                    timeout: 2500
                });
            }
            else if (succ == "4") {
                UIkit.notification({
                    message: '<span class="uk-margin-right" uk-icon="ban"></span>Unable to find file!',
                    status: 'danger',
                    pos: 'top-center',
                    timeout: 2500
                });
            }
            else if (succ == "5") {
                UIkit.notification({
                    message: '<span class="uk-margin-right" uk-icon="ban"></span>Failed to permanently remove file(s)!',
                    status: 'danger',
                    pos: 'top-center',
                    timeout: 2500
                });
            }
            else if (succ == "6") {
                UIkit.notification({
                    message: '<span class="uk-margin-right" uk-icon="ban"></span>Guest has no rights, your IP will be noted!',
                    status: 'danger',
                    pos: 'top-center',
                    timeout: 2500
                });
            }
            else if (succ == "7") {
                $('#' + lastItemId).remove();
                $("#delete-modal-close").click();

                UIkit.notification({
                    message: '<span class="uk-margin-right" uk-icon="check"></span>Successfully removed directory!',
                    status: 'success',
                    pos: 'top-center',
                    timeout: 2500
                });
            }
            else if (succ == "8") {
                UIkit.notification({
                    message: '<span class="uk-margin-right" uk-icon="ban"></span>Some files are still in the directory!',
                    status: 'danger',
                    pos: 'top-center',
                    timeout: 2500
                });
            }
            else {
                alert(succ);
                /*UIkit.notification({
                    message: '<span class="uk-margin-right" uk-icon="close"></span>We have no idea what went wrong...',
                    status: 'danger',
                    pos: 'top-center',
                    timeout: 2500
                });*/
            }
        }).done(function() {
            console.log("%c[REMOVE] Successfully POSTed file remove request", 'color: green;');
        }).fail(function(err) {
            console.log("%c[REMOVE] failed to remove file. Error: "+ err, 'color: red');
        }).always(function() {
            console.log("%c[REMOVE] Finished remove file POST", 'color: blue');
        });
    });
});
