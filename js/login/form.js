$(document).ready(function() {
    $("#login-asguest").click(function() {
        $.post("/inc/login/login.php",
        {
            guest: true
        }, function(succ) {
            if (succ == true) {
                UIkit.notification({
                    message: '<span class="uk-margin-right" uk-icon="check"></span>Logged in as guest.',
                    status: 'success',
                    pos: 'top-center',
                    timeout: 2500
                });
                setTimeout(function() {
                    window.location.assign("/");
                }, 1500);
            }
            else {
                UIkit.notification({
                    message: '<span class="uk-margin-right" uk-icon="ban"></span>Something went wrong?!',
                    status: 'danger',
                    pos: 'top-center',
                    timeout: 2500
                });
            }
        }).done(function() {
            console.log("[LOGIN] Logged in as guest user!");
        }).fail(function(err) {
            console.log("[LOGIN] Failed to log in as guest! "+ err);
        }).always(function() {
            console.log("[LOGIN] Guest login POST finished");
        });
    });

    // Execute a function when the user releases a key on the keyboard
    $("#login-password").keyup(function(e) {
        // Cancel the default action, if needed
        e.preventDefault();
        // Number 13 is the "Enter" key on the keyboard
        if (e.keyCode === 13) {
            // Trigger the button element with a click
            // Will submit form anyways
            $("#login-user").click();
        }
    });

    $("#login-user").click(function() {
        $.post("/inc/login/login.php",
        {
            username: $('#login-username').val(),
            password: $('#login-password').val()
        }, function(succ) {
            if (succ == true) {
                UIkit.notification({
                    message: '<span class="uk-margin-right" uk-icon="check"></span>Logged in.',
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
                    message: '<span class="uk-margin-right" uk-icon="ban"></span>Password incorrect!',
                    status: 'danger',
                    pos: 'top-center',
                    timeout: 2500
                });
            }
            else if (succ == "3") {
                UIkit.notification({
                    message: '<span class="uk-margin-right" uk-icon="ban"></span>No matching username found!',
                    status: 'danger',
                    pos: 'top-center',
                    timeout: 2500
                });
            }
            else {
                UIkit.notification({
                    message: '<span class="uk-margin-right" uk-icon="ban"></span>Something went wrong?!',
                    status: 'danger',
                    pos: 'top-center',
                    timeout: 2500
                });

                alert(succ);
            }
        }).done(function() {
            console.log("[LOGIN] Logged in as normal user!");
        }).fail(function(err) {
            console.log("[LOGIN] Failed to log in normal user! Error: "+ err);
        }).always(function() {
            console.log("[LOGIN] User login POST finished");
        });
    });
});
