var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

jQuery(document).ready(function ($) {
    var guest = getUrlParameter('guest');
    if (guest in guestList) {
        var guests = guestList[guest];
        var guestsHtmlText = guests.first;
        var guestsEmailText = guests.first;
        if ('second' in guests) {
            guestsHtmlText = guestsHtmlText + "<br>&<br>" + guests.second;
            guestsEmailText = guestsEmailText + " y " + guests.second;
        }
        $('#guest-names').html(guestsHtmlText);
        var confirmHrefValue = "mailto:juan.jalogut@gmail.com,nuria.hernaez@gmail.com?subject=Confirmar asistencia&body=" +  guestsEmailText + " confirmado(s) 🙌! %0D%0A %0D%0A Bus desde Valladolid/Torrecilla: Si/No %0D%0A %0D%0A %0D%0A -> Otra información aqui (alergias, intolerancias, vegetarian@...) "
        $('#confirm-button').attr('href', confirmHrefValue);
        $('#present-button').click(function(){
            $("#slider-arrow-right").click()
            return false;
        });
        $('#slider').show();
    } else {
        $('#error-gif').show();
    }

    var jssor_1_options = {
      $Loop: 0,
      $AutoPlay: 0,
      $Idle: 2000,
      $SlideEasing: $Jease$.$InOutSine,
      $DragOrientation: 0,
      $ArrowNavigatorOptions: {
        $Class: $JssorArrowNavigator$
      },
      $BulletNavigatorOptions: {
        $Class: $JssorBulletNavigator$,
        $ChanceToShow: 0
      }
    };

    var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);

    //make sure to clear margin of the slider container element
    jssor_1_slider.$Elmt.style.margin = "";

    /*#region responsive code begin*/
    /*
        parameters to scale jssor slider to fill parent container
        MAX_WIDTH
            prevent slider from scaling too wide
        MAX_HEIGHT
            prevent slider from scaling too high, default value is original height
        MAX_BLEEDING
            prevent slider from bleeding outside too much, default value is 1
            0: contain mode, allow up to 0% to bleed outside, the slider will be all inside parent container
            1: cover mode, allow up to 100% to bleed outside, the slider will cover full area of parent container
            0.1: flex mode, allow up to 10% to bleed outside, this is better way to make full window slider, especially for mobile devices
    */
    var MAX_WIDTH = 3000;
    var MAX_HEIGHT = 3000;
    var MAX_BLEEDING = 0.128;

    function ScaleSlider() {
        var containerElement = jssor_1_slider.$Elmt.parentNode;
        var containerWidth = containerElement.clientWidth;

        if (containerWidth) {
            var originalWidth = jssor_1_slider.$OriginalWidth();
            var originalHeight = jssor_1_slider.$OriginalHeight();

            var containerHeight = containerElement.clientHeight || originalHeight;

            var expectedWidth = Math.min(MAX_WIDTH || containerWidth, containerWidth);
            var expectedHeight = Math.min(MAX_HEIGHT || containerHeight, containerHeight);

            //scale the slider to expected size
            jssor_1_slider.$ScaleSize(expectedWidth, expectedHeight, MAX_BLEEDING);

            //position slider at center in vertical orientation
            jssor_1_slider.$Elmt.style.top = ((containerHeight - expectedHeight) / 2) + "px";

            //position slider at center in horizontal orientation
            jssor_1_slider.$Elmt.style.left = ((containerWidth - expectedWidth) / 2) + "px";
        }
        else {
            window.setTimeout(ScaleSlider, 30);
        }
    }

    ScaleSlider();

    $(window).bind("load", ScaleSlider);
    $(window).bind("resize", ScaleSlider);
    $(window).bind("orientationchange", ScaleSlider);
    /*#endregion responsive code end*/

    jssor_1_slider.$On($JssorSlider$.$EVT_PARK, function(slideIndex, fromIndex) {
        // Hide right arrow on confirmation/present slide. Present slide is only accesible by pressing button
        if (slideIndex == 3) {
            $('#slider-arrow-right').addClass('hidden');
        } else {
            $('#slider-arrow-right').removeClass('hidden');
        }
        //console.log(slideIndex);
    });
});
