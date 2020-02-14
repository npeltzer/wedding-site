$(function () {
    var url = location.href.replace(/\/$/, "");
 
  if (location.hash) {
    var hash = url.split("#");
    $('.navbar-nav a[href="#'+hash[1]+'"]').tab("show");
    url = location.href.replace(/\/#/, "#");
    history.replaceState(null, null, url);
    setTimeout(() => {
      $(window).scrollTop(0);
    }, 400);
  } 

    $(".nav-link").on("click", function () {
        var curId = $(this).attr("href");
        $(".tab-pane").removeClass("active");
        $(".nav-link").removeClass("active");
        $(".tab-pane" + curId).addClass("active");
        history.replaceState(null, null, curId);
    });
    $('.navbar-nav>li>a').on('click', function () {
        $('.navbar-collapse').collapse('hide');
    });
    $('#clock').countdown('2020/10/30').on('update.countdown', function (event) {
        var $this = $(this).html(event.strftime(''
            + '<span class="h1 font-weight-bold">%D</span> Day%!d'
            + '<span class="h1 font-weight-bold">%H</span> Hr'
            + '<span class="h1 font-weight-bold">%M</span> Min'
            + '<span class="h1 font-weight-bold">%S</span> Sec'));
    });
    loadGallery(true, 'a.thumbnail');

    //This function disables buttons when needed
    function disableButtons(counter_max, counter_current) {
        $('#show-previous-image, #show-next-image')
            .show();
        if (counter_max === counter_current) {
            $('#show-next-image')
                .hide();
        } else if (counter_current === 1) {
            $('#show-previous-image')
                .hide();
        }
    }

    /**
     *
     * @param setIDs        Sets IDs when DOM is loaded. If using a PHP counter, set to false.
     * @param setClickAttr  Sets the attribute for the click handler.
     */

    function loadGallery(setIDs, setClickAttr) {
        let current_image,
            selector,
            counter = 0;

        $('#show-next-image, #show-previous-image')
            .click(function () {
                if ($(this)
                    .attr('id') === 'show-previous-image') {
                    current_image--;
                } else {
                    current_image++;
                }

                selector = $('[data-image-id="' + current_image + '"]');
                updateGallery(selector);
            });

        function updateGallery(selector) {
            let $sel = selector;
            current_image = $sel.data('image-id');
            $('#image-gallery-title')
                .text($sel.data('title'));
            $('#image-gallery-image')
                .attr('src', $sel.data('image'));
            disableButtons(counter, $sel.data('image-id'));
        }

        if (setIDs == true) {
            $('[data-image-id]')
                .each(function () {
                    counter++;
                    $(this)
                        .attr('data-image-id', counter);
                });
        }
        $(setClickAttr)
            .on('click', function () {
                updateGallery($(this));
            });
    }
});

$(document)
    .keydown(function (e) {
        switch (e.which) {
            case 37: // left
                if ((modalId.data('bs.modal') || {})._isShown && $('#show-previous-image').is(":visible")) {
                    $('#show-previous-image')
                        .click();
                }
                break;

            case 39: // right
                if ((modalId.data('bs.modal') || {})._isShown && $('#show-next-image').is(":visible")) {
                    $('#show-next-image')
                        .click();
                }
                break;

            default:
                return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });