//ハンバーガーメニュー
$(function () {
    $('.hamburger').click(function () {
        $(this).toggleClass('active');
        $('.header__nav').toggleClass('active');
    });

    $('.header__nav a').click(function () {
        $('.hamburger').removeClass('active');
        $('.header__nav').removeClass('active');
    });
    $(".header__nav a").click(function () {
        $(".hamburger").removeClass("active");
        $(".header__nav").removeClass("active");
    });
});

//ヘッダー　スクロール
const fv = $('.fv');
const $floatBtns = $('.c-to-top, .c-contact__btn');
$floatBtns.hide(); // 初期非表示

function checkFloatingBtns() {
    const fvExists = fv.length > 0;
    const fvHeight = fvExists ? fv.outerHeight() : 0;
    const scroll = $(window).scrollTop();

    if (fvExists) {
        if (scroll > fvHeight) {
            $floatBtns.fadeIn(300);
        } else {
            $floatBtns.fadeOut(300);
        }
    } else {
        const displayPx = 300;
        if (scroll > displayPx) {
            $floatBtns.fadeIn(300);
        } else {
            $floatBtns.fadeOut(300);
        }
    }
<<<<<<< HEAD

    $(window).on('scroll', checkScroll);
    $(window).on('resize', checkScroll);
    checkScroll();
});


function initFloatingBtns() {
    const fv = $('.fv');
    const $floatBtns = $('.c-to-top, .c-contact__btn');

    $floatBtns.hide();

    function checkFloatingBtns() {
        const fvExists = fv.length > 0;
        
        const fvHeight = fvExists ? fv.outerHeight() : 0;
        const scroll = $(window).scrollTop();

        if (fvExists) {
           
            if (scroll > fvHeight) {
                $floatBtns.fadeIn(300); 
            } else {
                $floatBtns.fadeOut(300); 
            }
        } else {
            const displayPx = 300; 
            if (scroll > displayPx) {
                $floatBtns.fadeIn(300);
            } else {
                $floatBtns.fadeOut(300);
            }
        }
    }

    $(window).off('scroll resize load', checkFloatingBtns);
    $(window).on('scroll resize load', checkFloatingBtns);

    $('.c-to-top a').off('click').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 600);
    });
}

$(window).on('load', function () {
    initFloatingBtns();
});


$(function () {
    initFloatingBtns();
});

$(document).on('pjax:end', function () {
    initFloatingBtns();
});
=======
}

$(window).off('scroll resize load', checkFloatingBtns);
$(window).on('scroll resize load', checkFloatingBtns);

$('.c-to-top a').off('click').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 600);
});

>>>>>>> develop01




//アコーディオン
$(function () {
    $(".js-faq-toggle").attr("aria-expanded", "false");
    $(".faq__answer").hide();

    function toggleFaq($toggle, $answer) {
        const isOpen = $answer.is(":visible");
        if (!isOpen) {
            $answer.css("display", "flex").hide().slideDown(400);
            $toggle.attr("aria-expanded", true);
        } else {
            $answer.slideUp(400);
            $toggle.attr("aria-expanded", false);
        }
    }

    $(".js-faq-toggle").on("click", function () {
        const $this = $(this);
        const $answer = $this.next(".faq__answer");
        toggleFaq($this, $answer);
    });

    $(".faq__answer").on("click", function () {
        const $answer = $(this);
        const $toggle = $answer.prev(".js-faq-toggle");
        toggleFaq($toggle, $answer);
    });
});


//生徒さんたちの声　スライダー
function getSpaceBetween() {
    const baseWidth = 1080;
    const baseSpace = 35;
    const currentWidth = window.innerWidth;
    const ratio = currentWidth / baseWidth;

    return Math.min(baseSpace, Math.max(baseSpace * ratio, 10));
}

// Swiper 初期化関数
function initVoiceSwiper() {
    return new Swiper('.voice__inner', {
        loop: true,
        navigation: {
            nextEl: '.voice__next',
            prevEl: '.voice__prev',
        },
        slidesPerView: 3,
        spaceBetween: getSpaceBetween(),
        breakpoints: {
            0: { slidesPerView: 1 },
            768: { slidesPerView: 3 },
        },
        observer: true,
        observeParents: true,
    });
}

let voiceSwiper = initVoiceSwiper();

// リサイズ時に再初期化
window.addEventListener('resize', () => {
    voiceSwiper.destroy(true, true);
    voiceSwiper = initVoiceSwiper();
});
