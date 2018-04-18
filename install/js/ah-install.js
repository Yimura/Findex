$(document).ready(function() {
    var page = 1;
    var pagecounter;
    var index;
    var element = '#install-switcher';
    var maxPage = $('#install-switcher').children().length;
    setupPages(element);

    $('#button-right').click(function(){
        if (page < maxPage) {
            page = page + 1;
            index = page - 1;

            switchPage(element, index);

            $('#button-left').removeClass('ah-disabled');

            if (page == maxPage) {
                $(this).addClass('ah-disabled');
            }

            changeBreadCrumbs();
        }
    });

    $('#button-left').click(function(){
        if (page > 1) {
            page = page - 1;
            index = page - 1;

            switchPage(element, index);

            $('#button-right').removeClass('ah-disabled');

            if (page == 1) {
                $(this).addClass('ah-disabled');
            }
        }

        changeBreadCrumbs();
    });

    function switchPage(parent, index) {
        var activePage = $(parent).children().eq(index);
        var loopCount = $(parent).children().length;

        for (var i = 0; i < loopCount; i++) {
            var siblingPage = $(parent).children().eq(i);
            if (activePage.get(0) == siblingPage.get(0)) {
                if ($(activePage).css('display') == "none") {
                    $(activePage).fadeIn(500);
                    pagecount = "PAGE " + (index + 1);
                    $('#page-counter').html(pagecount);
                }
            }
            else if ($(siblingPage).css('display') != "none") {
                $(siblingPage).fadeOut(100);
            }
        }
    }

    function changeBreadCrumbs() {
        var currentBread = "#bread-" + page;
        for (var i = 1; i <= maxPage; i++) {
            var elementBreadCrumb = "#bread-" + i;
            if ($(elementBreadCrumb).get(0) != $(currentBread).get(0)) {
                // Only add the class if doesn't have it
                if ($(elementBreadCrumb).not('.ah-disabled')) {
                    $(elementBreadCrumb).addClass('ah-disabled');
                }
            }
            else if ($(elementBreadCrumb).get(0) == $(currentBread).get(0)) {
                // Remove the class to set the bread to active
                if ($(currentBread).hasClass('ah-disabled')) {
                    $(currentBread).removeClass('ah-disabled')
                }
            }
        }
    }

    function setupPages(parent) {
        var loopCount = $(parent).children().length;
        // We start our pagecount at 1 because we want our first page to be visible (index 0)
        // Do our loopCount - 1 because we only start counting from the 2nd item (index 1)
        // we don't to lose performance by running the loop more then needed
        for (var i = 1; i <= (loopCount - 1); i++) {
            $(parent).children().eq(i).hide();
        }
    }
});
