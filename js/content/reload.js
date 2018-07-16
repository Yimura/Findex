function ReloadFiles() {
    $.ajax({
        type: 'POST',
        url: '/inc/action/setup-filemanager.php',
        data: {
            openDir: ""
        },
        success: function(succ) {
            if (succ == "1") {
                UIkit.notification({
                    message: '<span class="uk-margin-right" uk-icon="ban"></span>Failed to open directory',
                    status: 'danger',
                    pos: 'top-center',
                    timeout: 2500
                });
            }
            else if (succ == "2") {
                UIkit.notification({
                    message: '<span class="uk-margin-right" uk-icon="ban"></span>Unable to find directory',
                    status: 'danger',
                    pos: 'top-center',
                    timeout: 2500
                });
            }
            else {
                $("#file-wrapper").html(succ);
            }
        }
    }).fail(function(succ) {
        console.log(succ);
    }).done(function() {
        $("#goup-dir").removeClass("uk-hidden");
        console.log("%c[DIR-OPEN] POST request successfull!", 'color: green;');
    }).always(function() {
        console.log("%c[DIR-OPEN] Finished POST request!", 'color: blue;');
    });
}
