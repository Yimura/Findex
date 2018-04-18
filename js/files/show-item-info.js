$(document).ready(function() {
    function getInputValue(name, id) {
        var element = "input[name='" + name + id + "'";
        return $(element).val();
    }

    var lastItemId;

    $("[id^='show-item_']").click(function() {
        var attrId = $(this).attr('id');
        var itemId = attrId.split("_");
        lastItemId = itemId[itemId.length-1];

        var realpath        =   getInputValue("realpath_", lastItemId);
        var serverpath      =   getInputValue("serverpath_", lastItemId);
        var fileperms       =   getInputValue("perms_", lastItemId);
        var groupname       =   getInputValue("groupname_", lastItemId);
        var groupmembers    =   getInputValue("groupmembers_", lastItemId);
        var ownername       =   getInputValue("ownername_", lastItemId);
        var itemtype        =   getInputValue("itemType_", lastItemId);
        var itembasename    =   getInputValue("itemBaseName_", lastItemId);

        $("#item-title").html("Viewing file info of " + itembasename);
        $("#item-Type").html(itemtype);
    });
});
