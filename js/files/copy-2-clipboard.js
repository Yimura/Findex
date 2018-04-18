$(document).ready(function() {
    $(document).on("click", "[id^='copy-link_']", function() {
        var attrId = $(this).attr('id');
        var itemId = attrId.split("_");
        var lastItemId = itemId[itemId.length-1];

        var element = "input[name='serverpath_" + lastItemId;

        var shareLink = $(element).val();

        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(shareLink).select();
        document.execCommand("copy");
        $temp.remove();

        UIkit.notification({
            message: '<span class="uk-margin-right" uk-icon="check"></span>Link copied to Clipboard',
            status: 'success',
            pos: 'top-center',
            timeout: 5000
        });
    });
});
