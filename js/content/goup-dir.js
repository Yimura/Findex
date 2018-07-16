$(document).ready(function() {
    $(document).on("click", "#goup-dir", function() {
        $.ajax({
            type: 'POST',
            url: '/inc/action/setup-filemanager.php',
            data: {
                goupDir: true
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
                else if (succ == "3") {
                    UIkit.notification({
                        message: '<span class="uk-margin-right" uk-icon="ban"></span>Permission denied to folder',
                        status: 'danger',
                        pos: 'top-center',
                        timeout: 2500
                    });
                }
                else {
                    $("#file-wrapper").html(succ);
                }
            }
        }).fail(function(e) {
            console.log("%c[DIR-UP] Failed to load main active directory... Error: ", 'color: red;');
        }).done(function() {
            console.log("%c[DIR-UP] POST request successfull!", 'color: green;');
        }).always(function(e) {
            console.log("%c[DIR-UP] Finished POST request!", 'color: blue;');
        });
    });
});
