(function($) {

    var settings = {
        settingA : true,
        settingB : 123,
        settingC : "test",
        $settingD: null
    }

    var Main = {
        init: function() {
            Main.myFunction();
        },

        myFunction: function() {

        }
    };

    $(function() {
        Main.init();
    });

})(jQuery);
