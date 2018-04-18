$(document).ready(function() {
    $(document).on("click", "[id^='select_']", function() {
        var fileType = $(this).children().first().attr("uk-icon");

        if (fileType == "folder" || fileType == "copy") {
            $(this).children().first().attr("uk-icon", "check");
        }
        else {
            $(this).children().first().attr("uk-icon", $(this).children().first().attr("name"));
        }
    });

    $("#select-all").click(function() {
        for (var i = 0; i <= $("#select_0").parent().children().length; i++) {
            $("#select_"+ i).click();
        }
    });
});
