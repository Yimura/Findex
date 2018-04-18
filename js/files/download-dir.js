$(document).ready(function() {
    $("[id^='download-dir_']").click(function() {
        UIkit.notification({
            message: 'Zipping folder and adding to downloads!',
            status: 'primary',
            pos: 'top-right',
            timeout: 5000
        });


    });
});
