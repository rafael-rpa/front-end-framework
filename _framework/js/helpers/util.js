var Util = (function($) {

    // Private
    // var settings = {};

    // function myPrivateFunction() {
    // }

    // function myOtherPrivateFunction() {
    // }

    // Public
    return {

        // ========================================================================
        //  SMOOTH SCROLLING
        //
        //  Performs a smooth page scroll to an anchor on the same page.
        //
        // ========================================================================

        smoothScrolling: function() {
            $('a[href*="#"]:not([href="#"])').on('click', function() {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 800, function() {
                            target.focus();
                            if (target.is(":focus")) {
                                return false;
                            } else {
                                target.attr('tabindex','-1');
                                target.focus();
                            };
                        });
                        return false;
                    }
                }
            });
        },


        // ========================================================================
        //  NOW
        //
        //  A (possibly faster) way to get the current timestamp as an integer.
        //
        // ========================================================================

        now: Date.now || function() {
            return new Date().getTime();
        },


        // ========================================================================
        //  THROTTLE
        //
        //  Returns a function, that, when invoked, will only be triggered at most once during a given window of time.
        //  Normally, the throttled function will run as much as it can, without ever going more than once per wait duration;
        //  but if you’d like to disable the execution on the leading edge, pass {leading: false}. To disable execution on the trailing edge, ditto.
        //
        //  Example of usage:
        //  $(window).on('scroll', Util.throttle(function() {
        //      //...
        //  }, 200));
        // ========================================================================

        throttle: function(func, wait, options) {
            var context, args, result;
            var timeout = null;
            var previous = 0;

            if (!options) options = {};

            var later = function() {
                previous = options.leading === false ? 0 : Util.now();
                timeout = null;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            };

            return function() {
                var now = Util.now();
                if (!previous && options.leading === false) previous = now;
                var remaining = wait - (now - previous);
                context = this;
                args = arguments;
                if (remaining <= 0 || remaining > wait) {
                    if (timeout) {
                        clearTimeout(timeout);
                        timeout = null;
                    }
                    previous = now;
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                } else if (!timeout && options.trailing !== false) {
                    timeout = setTimeout(later, remaining);
                }

                return result;
            };
        },


        // ========================================================================
        //  DEBOUNCE
        //
        //  Returns a function, that, as long as it continues to be invoked, will not be triggered.
        //  The function will be called after it stops being called for N milliseconds.
        //  If immediate is passed, trigger the function on the leading edge, instead of the trailing.
        //
        //  Example of usage:
        //  $(window).on('resize', Util.debounce(function() {
        //      //...
        //  }, 200));
        // ========================================================================

        debounce: function(func, wait, immediate) {
            var timeout, args, context, timestamp, result;

            var later = function() {
                var last = Util.now() - timestamp;

                if (last < wait && last >= 0) {
                    timeout = setTimeout(later, wait - last);
                } else {
                    timeout = null;
                    if (!immediate) {
                        result = func.apply(context, args);
                        if (!timeout) context = args = null;
                    }
                }
            };

            return function() {
                context = this;
                args = arguments;
                timestamp = Util.now();
                var callNow = immediate && !timeout;
                if (!timeout) timeout = setTimeout(later, wait);
                if (callNow) {
                    result = func.apply(context, args);
                    context = args = null;
                }

                return result;
            };
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

        isOnScreen: function($element, x, y) {

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

        inlineFormLabels: function($element) {
            $element
            .on('keydown keyup', function() {
                if ($(this).val().length){
                    $(this).prev('label').addClass('hide');
                }else{
                    $(this).prev('label').removeClass('hide');
                }
            })
            .on('focusin', function() {
                $(this).prev('label').addClass('focused');
            })
            .on('focusout', function() {
                $(this).prev('label').removeClass('focused');
            });

            $element.each(function() {
                if ($(this).val().length){
                    $(this).prev('label').addClass('hide');
                }
            });
        },


        // ========================================================================
        //  EQUAL HEIGHT
        //
        //  If you don't need to support IE9 or lower you can achieve this by using CSS3 Flexbox.
        //
        // ========================================================================

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
