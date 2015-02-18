// Main functions
(function($) {

    // Settings namespace
    var settings = {
        settingA: true,
        settingB: false,
        settingC: "test"
    }

    var Main = {
        // Init Main
        init: function() {
            Main.myFunction();
        },

        // myFunction
        myFunction: function() {

        }
    };

    $(function() {
        Main.init();
    });

})(jQuery);
