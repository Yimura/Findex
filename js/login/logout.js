$(document).ready(function() {
    $('#user-logout').click(function() {
        $.post("/inc/logout.php",
        {
            logout: true
        }, function(succ) {
            if (succ == true) {
                UIkit.notification({
                    message: '<span class="uk-margin-right" uk-icon="check"></span>Logged out, redirecting...',
                    status: 'success',
                    pos: 'top-center',
                    timeout: 2500
                });
                setTimeout(function() {
                    window.location.assign("/");
                }, 1500);
            }
            else if (succ == "2") {
                UIkit.notification({
                    message: '<span class="uk-margin-right" uk-icon="ban"></span>Failed to log out!?',
                    status: 'danger',
                    pos: 'top-center',
                    timeout: 2500
                });
            }
        }).done(function() {
            console.log("[LOGOUT] Logged out!");
        }).fail(function(err) {
            console.log("[LOGOUT] Failed to log out! "+ err);
        }).always(function() {
            console.log("[LOGOUT] Logout POST finished.");
        });
    });
});
