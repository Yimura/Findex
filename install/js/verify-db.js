$(document).ready(function() {
    $("#verify-credentials").click(function() {
        if ($('#db-host').val() == "" || $('#db-name').val() == "" || $('#db-user').val() == "" || $('#db-pass').val() == "") {
            UIkit.notification({
                message: '<span class="uk-margin-right" uk-icon="ban"></span>Please fill in all fields!',
                status: 'danger',
                pos: 'top-center',
                timeout: 2500
            });
            return
        }

        $.post("/install/tests/test-connection.php",
        {
            dbhost: $('#db-host').val(),
            dbname: $('#db-name').val(),
            dbuser: $('#db-user').val(),
            dbpass: $('#db-pass').val(),
            dbport: $('#db-port').val()
        }, function(succ) {
            if (succ == true) {
                UIkit.notification({
                    message: '<span class="uk-margin-right" uk-icon="check"></span>Database ok!',
                    status: 'success',
                    pos: 'top-center',
                    timeout: 2500
                });
            }
            else if (succ == false) {
                UIkit.notification({
                    message: '<span class="uk-margin-right" uk-icon="close"></span>Invalid credentials!?',
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
            console.log("[DB-Check] Database Checked");
        }).fail(function(err) {
            console.log("[DB-Check] Failed to check database:");
            console.log(err)
        }).always(function() {
            console.log("[DB-Check] Database check finished");
        });
    });
});
