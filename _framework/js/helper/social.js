var Social = (function($) {

    var currentURL = window.location.href;

    function windowPopup(url, width, height){
        var left = (screen.width / 2) - (width / 2),
            top = (screen.height / 2) - (height / 2);

        window.open(
            url,
            "",
            "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left
        );
    }

    return {

        // ========================================================================
        //
        //  Example of using:
        //
        //    The URL parameter is optional for every social network, so if blank (like the second anchor example of Facebook), the current URL will be used instead.
        //
        //    <a href="#" class="share-twitter" data-text="Lorem ipsum dolor sit amet." data-url="http://domain.com"></a>
        //    <a href="#" class="share-facebook"></a>
        //
        //    ...
        //    $(".share-twitter").on("click", function(e){
        //        e.preventDefault();
        //        Social.twitter(
        //            $(this).data("text"),
        //            $(this).data("url")
        //        );
        //    });
        //    ...
        //
        // ========================================================================

        facebook: function(url){
            var shareURL = url || currentURL;
            var facebookURL = "https://facebook.com/sharer.php?u=" + encodeURIComponent(shareURL);
            windowPopup(facebookURL, 600, 400);
        },

        twitter: function(text, url){
            var shareURL = url || currentURL;
            var twitterURL = "https://twitter.com/share?text=" + encodeURIComponent(text) + "&url=" + encodeURIComponent(shareURL);
            windowPopup(twitterURL, 600, 400);
        },

        googlePlus: function(url){
            var shareURL = url || currentURL;
            var googlePlusURL = "https://plus.google.com/share?url=" + encodeURIComponent(shareURL);
            windowPopup(googlePlusURL, 600, 400);
        },

        pinterest: function(media, description, url){
            var shareURL = url || currentURL;
            var pinterestURL = "https://pinterest.com/pin/create/bookmarklet/?media=" + encodeURIComponent(media) + "&url=" + encodeURIComponent(shareURL) + "&is_video=false&description=" + encodeURIComponent(description);
            windowPopup(pinterestURL, 600, 400);
        },

        linkedin: function(url){
            var shareURL = url || currentURL;
            var linkedinURL = "https://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(shareURL);
            windowPopup(linkedinURL, 600, 400);
        }

    };
})(jQuery);
