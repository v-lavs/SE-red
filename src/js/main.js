/*
* to include js file write: `//= include ./path-to-file`
* */

//= include ../lib/jquery.min.js ;
//= include ../lib/jquery-nice-select-1.1.0/js/jquery.nice-select.js
//= include ../lib/magnific-popup/jquery.magnific-popup.min.js
//= include ../lib/swiper/swiper-bundle.min.js


// CUSTOM SCRIPTS


$(document).ready(function () {


    //HEADER SCROLL
    let header = $('.header'),
        scrollPrev = 0;

    $(window).scroll(function () {
        var scrolled = $(window).scrollTop();

        if (scrolled > 100 && scrolled > scrollPrev) {
            header.addClass('header_active');
        } else {
            header.removeClass('header_active');
        }
        scrollPrev = scrolled;

        if (scrolled > 100) {
            header.addClass('bg_active');
        } else {
            header.removeClass('bg_active');
        }
    });


    // MOBILE MENU
    const nav = $('.header__nav');

    $('.btn-burger').on('click', function (e) {
        e.preventDefault();
        nav.addClass('open');
        jQuery('.backdrop').fadeIn();
        $('body').toggleClass('modal_open');
    });

    $('.menu__link, .btn_close, .backdrop, .trigger-popup').click(function (e) {
        $('.btn-burger').removeClass('open');
        nav.removeClass('open');
        $('.sub-menu__toggle').removeClass('sub-menu__toggle_active')
        jQuery('.backdrop').fadeOut();
        $('body').removeClass('modal_open');
    });
    $('.sub-menu__toggle').click(function (e) {
        $(this).toggleClass('sub-menu__toggle_active')
    });

    //NOTIFICATION CLOSE
    $('.notification__close').on('click', function (e) {
        $('.wrap-notification').fadeOut();
    });

//SWITCH NEWS-ACTION
    $('#switch').click(function () {

        if ($(this).is(':checked')) {
            $('.section-news .section__heading').toggleClass('switch-toggle');
        }
    });

//CUSTOM SELECT
    $('.custom-select').niceSelect();

//SLIDERS
    if ($('.banner-slider').length > 0) {
        const bannerSlider = new Swiper(".banner-slider", {
            pagination: {
                el: ".pagination-wrap .swiper-pagination",
            },
        });
    }
    var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 8,
        slidesPerView: 'auto',
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });
    var galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        thumbs: {
            swiper: galleryThumbs
        }
    });

//    SLIDE-DOWN SLIDE-THUMBS
    $('.panel-down').click(function (e) {
        $('.gallery-thumb-panel').toggleClass('active');
        $('.icon-fullscreen, .gallery-top .swiper-button-next, .gallery-top .swiper-button-prev').toggleClass('active-panel');
    });
    $('.gallery-top .swiper-wrapper').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {enabled: true},
        removalDelay: 600,
        callbacks: {
            beforeOpen: function () {

                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        },
        closeOnContentClick: true,
        midClick: true // allow opening
    });

//    SWIPER IN POPUP
    $('.popup-gallery-link').magnificPopup({
        callbacks: {
            open: function () {
                let constructionProgress = new Swiper(".construction-progress", {
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },
                });
                $('body').toggleClass('modal_open');
            },
            close: function () {
                $('body').removeClass('modal_open');
            }
        }
    });

// POPUP FEEDBACK
    $('.trigger-popup').click(function (e) {
        e.preventDefault();
        $('.popup-feedback').addClass('open_modal');
        $('.overlay').fadeIn();
        $('body').toggleClass('modal_open');
    });

    $('.popup .btn_close').click(function (e) {
        $('.popup').removeClass('open_modal');
        $('.overlay').fadeOut();
        $('body').removeClass('modal_open');
    });

    // INTL TEL
        form = document.querySelector("form"),
        result = document.querySelector(".btn_submit");
    const input = document.querySelector("#phone");
    // window.intlTelInput(input, {
    //     initialCountry: "ua",
    //     separateDialCode: true,
    //     preferredCountries: ["ua", "pl"],
    //     geoIpLookup: callback => {
    //         fetch("https://ipapi.co/json")
    //             .then(res => res.json())
    //             .then(data => callback(data.country_code))
    //             .catch(() => callback("us"));
    //     },
    //     utilsScript: "/intl-tel-input/js/utils.js?1683804567815" // just for formatting/placeholders etc
    // });

    errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"],
        result = document.querySelector("#result");


    window.addEventListener("load", function () {


        errorMsg = document.querySelector("#error-msg");

        function getIp(callback) {
            fetch('https://ipinfo.io', { headers: { 'Accept': 'application/json' }})
                .then((resp) => resp.json())
                .catch(() => {
                    return {
                        country: '',
                    };
                })
                .then((resp) => callback(resp.country));
        }

        var iti = window.intlTelInput(input, {
            hiddenInput: "full_number",
            nationalMode: false,
            formatOnDisplay: true,
            separateDialCode: true,
            autoHideDialCode: true,
            autoPlaceholder: "aggressive" ,

            placeholderNumberType: "MOBILE",

            geoIpLookup: getIp,
            initialCountry: "ua",

            preferredCountries: ["ua", "pl"],
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.15/js/utils.js",
        });


        input.addEventListener('keyup', formatIntlTelInput);
        input.addEventListener('change', formatIntlTelInput);

        function formatIntlTelInput() {
            if (typeof intlTelInputUtils !== 'undefined') { // utils are lazy loaded, so must check
                var currentText = iti.getNumber(intlTelInputUtils.numberFormat.E164);
                if (typeof currentText === 'string') { // sometimes the currentText is an object :)
                    iti.setNumber(currentText); // will autoformat because of formatOnDisplay=true
                }
            }
        }



        input.addEventListener('keyup', function () {
            reset();
            if (input.value.trim()) {
                if (iti.isValidNumber()) {
                    $(input).addClass('form-control is-valid');

                } else {
                    $(input).addClass('form-control is-invalid');
                    var errorCode = iti.getValidationError();
                    errorMsg.innerHTML = errorMap[errorCode];
                    $(errorMsg).show();
                }
            }
        });
        input.addEventListener('change', reset);
        input.addEventListener('keyup', reset);

        var reset = function () {
            $(input).removeClass('form-control is-invalid');
            errorMsg.innerHTML = "";
            $(errorMsg).hide();

        };



        ////////////// testing - start //////////////

        input.addEventListener('keyup', function(e) {
            e.preventDefault();
            var num = iti.getNumber(),
                valid = iti.isValidNumber();
            result.textContent = "Number: " + num + ", valid: " + valid;
        }, false);

        input.addEventListener("focus", function() {
            result.textContent = "";
        }, false);


        $(input).on("focusout", function(e, countryData) {
            var intlNumber = iti.getNumber();
            console.log(intlNumber);
        });

        ////////////// testing - end //////////////

    });


    //-----------------------only-phone-number-input code (with +)-------------------------------start-------//
    function isPhoneNumberKey(evt)
    {
        var charCode = (evt.which) ? evt.which : evt.keyCode
        if (charCode != 43 && charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }

    //-----------------------only-phone-number-input code (with +)-------------












    // var input = document.querySelector("input"),
    //     form = document.querySelector("form"),
    //     result = document.querySelector("#result");

    // var iti = intlTelInput(input, {
    //     initialCountry: "us"
    // });

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        var num = iti.getNumber(),
            valid = iti.isValidNumber();
        result.textContent = "Number: " + num + ", valid: " + valid;
    }, false);

    input.addEventListener("focus", function() {
        result.textContent = "Номер телефону введено некоректно";
    }, false);

    // const input = document.querySelector("#phone");
    // const errorMsg = document.querySelector("#error-msg");
    // const validMsg = document.querySelector("#valid-msg");
    //
    // // var input = document.querySelector("#phone-input");
    // var iti = window.intlTelInput(input, {
    //     initialCountry: "ua",
    //     separateDialCode: true,
    //     preferredCountries: ["ua", "pl"], // You can customize the preferred countries list
    //     geoIpLookup: callback => {
    //         fetch("https://ipapi.co/json")
    //             .then(res => res.json())
    //             .then(data => callback(data.country_code))
    //             .catch(() => callback("us"));
    //     },
    // });

    // Get the selected country dial code
    // Listen for changes to the selected country

    // input.addEventListener("countrychange", function () {
    //     var countryData = iti.getSelectedCountryData();
    // });
    //
    // function sanitizePhoneNumber(input) {
    //     var sanitized = "";
    //     var allowedCharacters = "0123456789+()- ";
    //
    //     for (var i = 0; i < input.length; i++) {
    //         var currentChar = input.charAt(i);
    //
    //         if (allowedCharacters.indexOf(currentChar) !== -1) {
    //             sanitized += currentChar;
    //         }
    //     }
    //
    //     return sanitized;
    // }
    //
    // input.addEventListener("input", function (event) {
    //     event.preventDefault();
    //     var inputValue = event.target.value;
    //     var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    //
    //     if (regex.test(inputValue)) {
    //         // Invalid international phone number
    //         $('#error-msg').addClass('hide');
    //     }else {
    //         $('#error-msg').removeClass('hide');
    //     }
    //
    //     this.value = sanitizePhoneNumber(inputValue);
    //
    //     if(inputValue.length > 17) {
    //         this.value = inputValue.slice(0, 18);
    //     }
    // });
});



