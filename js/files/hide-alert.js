$(document).ready(function() {
    $("#close-public-alert").click(function() {
        Cookies.set('alertPublicSeen', 'true', { expires: 30, path: '' });
    });
});
