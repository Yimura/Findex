$(document).ready(function() {
    $(document).on("click", "#close-public-alert", function() {
        Cookies.set('alertPublicSeen', 'true', { expires: 30, path: '' });
    });
});
