$(document).ready(function() {
    if (Cookies.get('isLoggedIn') == true) {
        $.ajax({
            type: 'POST',
            url: '/inc/action/setup-filemanager.php',
            data: {
                setup: true
            },
            success: function(succ) {
                if (succ == "1") {
                    UIkit.notification({
                        message: '<span class="uk-margin-right" uk-icon="ban"></span>Failed to fetch homedir',
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
            console.log("%c[DIR-SETUP] POST request successfull!", 'color: green;');
        }).always(function() {
            console.log("%c[DIR-SETUP] Finished POST request!", 'color: lightblue;');
        });
    }
});
