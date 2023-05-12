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

    var galleryThumbs = new Swiper(".gallery-thumbs", {
        loop: true,
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
    });
    var galleryTop = new Swiper(".gallery-top", {
        loop: true,
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: galleryThumbs,
        },
    });
});



