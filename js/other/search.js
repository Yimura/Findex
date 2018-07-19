$(document).ready(function() {
    var
        allowExpandSearchBox = true,
        dropDownH = ($("#searchDropdown").children.length - 1) * 25 + "px",
        searchDropTop = $('#searchBox').height + $('#searchBox').top,
        searchDropRight = $('#searchBox').right;

    $(document).click(function(event) {
        var elem = "#searchBox";
        if(event.target.id != "searchBox" &&  event.target.id != "searchDropdown") {
            if (allowExpandSearchBox == false) {
                $(elem).stop().animate({
                    width: "250px"
                }, 1000);

                $("#searchDropdown")
                    .stop()
                    .fadeIn()
                    .animate({
                        height: "0",
                        padding: "0",
                        width: "250px"
                    }, 1000, function(){
                        $(this).addClass("uk-hidden");
                    });

                setTimeout(function() {
                    allowExpandSearchBox = true;
                }, 1000)
            }
        }
        else {
            if (allowExpandSearchBox == true) {
                $(elem).stop().animate({
                    width: "350px"
                }, 400);

                $("#searchDropdown")
                    .removeClass("uk-hidden")
                    .css({
                        position: "fixed",
                        top: searchDropTop,
                        right: searchDropRight,
                        height: "auto"
                    })
                    .stop()
                    .fadeIn()
                    .animate({
                        padding: "20px 25px",
                        width: "350px"
                    }, 400);
                allowExpandSearchBox = false;
            }
        }
    });

    var
        request = null,
        loading = '<p class="uk-text-center uk-margin-remove-bottom">Loading<span class="uk-margin-left" uk-spinner="ratio: 0.7"></span></p>',
        defaultDropdown = '<p class="uk-text-center uk-margin-remove-bottom">Waiting for input<span class="uk-margin-left" uk-spinner="ratio: 0.7"></span></p>';
    $('#searchBox').on("keyup", function() {
        var inputVal = $(this).val();

        if (inputVal != "") {
            $("#searchDropdown").html(loading);
            request = $.ajax({
                method: "POST",
                url: "/inc/action/search.php",
                data: {
                    keyword: inputVal
                },
                success: function(succ) {
                    $("#searchDropdown").html(succ);
                },
                error: function(err) {
                    console.log("Error occured check below for error info");
                    console.log(err);
                },
                complete: function() {
                    console.log("Search Ajax CALL finished!");
                }
            });
        }
        else {
            $("#searchDropdown").html(defaultDropdown);
        }
    });

    /*function changePlaceHolder(element, substract, write) {
        var attr = "placeholder";
        var placeHolderTxt = $(element).attr(attr);
        var allowChange = false;
        var i = 1;
        while (i <= substract) {
            var newPlaceHolder = placeHolderTxt.slice(0, -i);
            console.log(newPlaceHolder+": "+i);
            setTimeout(function() {
                $(element).attr(attr, newPlaceHolder);
            }, 600 * i);
            if (i == substract) {
                allowChange = true;
            }
            i++;
        }

        // We don't have execute write if we just need to substract
        if (write != -1) {
            placeHolderTxt = placeHolderTxt.slice(0, -substract);
            i = 1;
            if (allowChange) {
                while (i <= write.length) {
                    var newPlaceHolder = placeHolderTxt + write.slice(0, i);
                    console.log(newPlaceHolder+": "+i);
                    setTimeout(function() {
                        $(element).attr(attr, newPlaceHolder);
                    }, 250 * i);
                    i++;
                }
            }
        }
    }

    $("#searchBox").focus(function() {
        $("#navSearch").delay(1000).css("border-left", "1px solid #1e87f0");
    });

    $("#searchBox").blur(function() {
        $("#navSearch").delay(1000).css("border-left", "");
    });*/
});
