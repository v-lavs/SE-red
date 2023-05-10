/*
* to include js file write: `//= include ./path-to-file`
* */

//= include ../lib/jquery.min.js ;
//= include ../lib/swiper/swiper-bundle.min.js

// CUSTOM SCRIPTS



$(document).ready(function () {

    // MOBILE MENU
    const nav = $('.header__nav');

    $('.btn-burger').on('click', function (e) {
        e.preventDefault();
        nav.toggleClass('open');
        $(this).toggleClass('open');
        $('body').toggleClass('modal_open');
    });

    $('.menu__link').click(function (e) {
        $('.btn-burger').removeClass('open');
        nav.removeClass('open');
        $('body').removeClass('modal_open');
    });

//SWITCH NEWS-ACTION
    $('#switch').click(function () {

        if ($(this).is(':checked')) {
            $('.section-news .section__heading').toggleClass('switch-toggle');
        }
    });

//    SLIDERS
    if ($('.banner-slider').length > 0) {
        const bannerSlider = new Swiper(".banner-slider", {
            pagination: {
                el: ".pagination-wrap .swiper-pagination",
            },
        });
    }
});



