$(document).ready(function() {
    $(document).on("click", "[id^='download-dir_']", function() {
        UIkit.notification({
            message: 'Zipping folder and adding to downloads!',
            status: 'primary',
            pos: 'top-right',
            timeout: 5000
        });
    });
});
