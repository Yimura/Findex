window.onscroll = function changeClass(){
    var scrollPosY = window.pageYOffset | document.body.scrollTop;

    var navBar = document.getElementsByClassName('ah-navbar-container')[0];
    var activeElement = document.getElementsByClassName('uk-active')[0];

    if(scrollPosY > 0) {
        activeElement.children[0].style.boxShadow = "0 9px 0px 0px #fff0, 0 -9px 0px 0px white, 14px 0 15px -15px #4a3e3e, -14px 0 15px -15px #4a3e3e";
    } else {
        activeElement.children[0].style.boxShadow = "";
    }
}

$(document).ready(function ()
{
    var dropdownHovered = false;
    /*if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
    {
		var clickEvent = "tap";
        var hoverEvent = "tap";
	}
	else
	{
		var clickEvent = "click";
        var hoverEvent = "mouseover";
	}*/

    $(window).bind('scroll', function () {
		if($(this).scrollTop() > 0) {
			$('.ah-navbar-container').addClass("ah-navbar-sticky");
		} else {
			$('.ah-navbar-container').removeClass("ah-navbar-sticky");
		}
	});

    $(document).on('mouseenter', '.dropdown-sibling', function (event) {
        $(this).siblings(0).stop().fadeIn(200);
        //$(this).siblings(0).css('display', 'initial');
    }).on('mouseleave', '.dropdown-sibling',  function(){
        $(this).siblings(0).stop().fadeOut(200);
        //$(this).siblings(0).css('display', 'none');
    });

    $(document).on('mouseenter', '.dropdown-fix', function (event) {
        $(this).stop(); // Cancel the fadeout event from above
        $(this).css('display', 'initial');
        // Set opacity, in some cases it was possible to semi-fade the menu
        $(this).css('opacity', '1');
    }).on('mouseleave', '.dropdown-fix',  function(){
        $(this).stop().fadeOut(200);
        //$(this).css('display', 'none');
    });
});
