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

//   MENU-PAGE
    $('.btn-toggle-open').on('click', function (e) {
        $('.block-nav-page').fadeToggle();
    });
    $('.menu_page .menu__item').on('click', function (e) {
        $('.block-nav-page').fadeOut();
    });


//SWITCH NEWS-ACTION
    $('#switch').click(function () {
            $('.section-news .section__heading').toggleClass('switch-toggle');
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
        $('.backdrop').fadeIn();
        $('body').toggleClass('modal_open');
    });

    $('.popup .btn_close').click(function (e) {
        $('.popup').removeClass('open_modal');
        $('.backdrop').fadeOut();
        $('body').removeClass('modal_open');
    });

});



