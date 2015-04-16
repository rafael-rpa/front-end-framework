var Util = (function($) {

    // Private
    // var settings = {};

    // function myPrivateFunction() {
    // }

    // function myOtherPrivateFunction() {
    // }

    // Public
    return {

        svgCallback: function(){
            if(!Modernizr.svg) {
                $('img[src*="svg"]').attr('src', function() {
                    return $(this).attr('src').replace('.svg', '.png');
                });
            }
        },

        smoothScrolling: function(){
            $('a[href*=#]:not([href=#])').on('click', function() {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    }
                }
            });
        },

        // ========================================================================
        //  IS ON SCREEN
        //
        //  Find below some examples:
        //
        //  Util.isOnScreen($('selector'));  // returns true if element is entirely within the viewport
        //  Util.isOnScreen($('selector'), 0.5, 0.5); // returns true if element is at least 50% within the viewport
        //  Util.isOnScreen($('selector'), 0.1, 0.5); // returns true if at least 10% of the width were visible and 50% of the height were visible
        //
        // ========================================================================

        isOnScreen: function($element, x, y){

            if(x == null || typeof x == 'undefined') x = 1;
            if(y == null || typeof y == 'undefined') y = 1;

            var win = $(window);

            var viewport = {
                top : win.scrollTop(),
                left : win.scrollLeft()
            };
            viewport.right = viewport.left + win.width();
            viewport.bottom = viewport.top + win.height();

            var height = $element.outerHeight();
            var width = $element.outerWidth();

            if(!width || !height){
                return false;
            }

            var bounds = $element.offset();
            bounds.right = bounds.left + width;
            bounds.bottom = bounds.top + height;

            var visible = (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

            if(!visible){
                return false;
            }

            var deltas = {
                top : Math.min( 1, ( bounds.bottom - viewport.top ) / height),
                bottom : Math.min(1, ( viewport.bottom - bounds.top ) / height),
                left : Math.min(1, ( bounds.right - viewport.left ) / width),
                right : Math.min(1, ( viewport.right - bounds.left ) / width)
            };

            return (deltas.left * deltas.right) >= x && (deltas.top * deltas.bottom) >= y;
        },

        // ========================================================================
        //  INLINE FORM LABELS
        //
        //  Follow the structure below:
        //
        //  <form class="form-inline">
        //      ...
        //      <div>
        //          <label for="name">Name</label>
        //          <input type="text" id="name" name="name">
        //      </div>
        //      ...
        //  </form>
        // ========================================================================

        inlineFormLabels: function($element){
            $element
            .on('keydown keyup', function(){
                if ($(this).val().length == 0){
                    if($(this).parent().children('label').first().hasClass('hide')){
                        $(this).parent().children('label').first().removeClass('hide');
                    }
                }else{
                    if(!$(this).parent().children('label').first().hasClass('hide')){
                        $(this).parent().children('label').first().addClass('hide');
                    }
                }
            })
            .on('focusin', function() {
                $(this).parent().children('label').first().addClass('focused');
            })
            .on('focusout', function() {
                $(this).parent().children('label').first().removeClass('focused');
            });
        },

        equalHeight: function($element) {
            tallest = 0;
            $element.each(function() {
                thisHeight = $(this).outerHeight();
                if(thisHeight > tallest) {
                    tallest = thisHeight;
                }
            });
            $element.outerHeight(tallest);
        }

    };
})(jQuery);
