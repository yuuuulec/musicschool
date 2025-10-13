// =========================
// ハンバーガーメニュー
// =========================
$(function () {
    $('.hamburger').click(function () {
        $(this).toggleClass('active');
        $('.header__nav').toggleClass('active');
    });

    $('.header__nav a').click(function () {
        $('.hamburger').removeClass('active');
        $('.header__nav').removeClass('active');
    });

    $(window).on('resize', function () {
        if (window.innerWidth > 768) {
            $('.hamburger').removeClass('active');
            $('.header__nav').removeClass('active');
        }
    });
});

// =========================
// フローティングボタン
// =========================
$(function () {
    const fv = $('.fv');
    const $floatBtns = $('.c-to-top, .c-contact__btn');
    $floatBtns.hide();

    function checkFloatingBtns() {
        const fvExists = fv.length > 0;
        const fvHeight = fvExists ? fv.outerHeight() : 0;
        const scroll = $(window).scrollTop();

        if (fvExists) {
            scroll > fvHeight ? $floatBtns.fadeIn(300) : $floatBtns.fadeOut(300);
        } else {
            const displayPx = 300;
            scroll > displayPx ? $floatBtns.fadeIn(300) : $floatBtns.fadeOut(300);
        }
    }

    $(window).on('scroll resize load', checkFloatingBtns);
    checkFloatingBtns();

    $('.c-to-top a').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 600);
    });
});

// =========================
// アコーディオン（FAQ）
// =========================
$(function () {
    const $toggles = $(".js-faq-toggle");
    const $answers = $(".faq__answer");

    // 初期状態：全て閉じる
    $toggles.attr("aria-expanded", "false");
    $answers.hide();

    function toggleFaq($toggle, $answer) {
        const isOpen = $answer.is(":visible");

        if (!isOpen) {
            $answer.stop(true, true).slideDown(400);
            $toggle.attr("aria-expanded", "true");
        } else {
            $answer.stop(true, true).slideUp(400);
            $toggle.attr("aria-expanded", "false");
        }
    }

    $toggles.on("click", function () {
        const $this = $(this);
        const $answer = $this.next(".faq__answer");
        toggleFaq($this, $answer);
    });

    $answers.on("click", function () {
        const $answer = $(this);
        const $toggle = $answer.prev(".js-faq-toggle");
        toggleFaq($toggle, $answer);
    });
});

// =========================
// 生徒さんたちの声スライダー（Swiper）
// =========================
function getSpaceBetween() {
    const baseWidth = 1080;
    const baseSpace = 35;
    const currentWidth = window.innerWidth;
    const ratio = currentWidth / baseWidth;
    return Math.min(baseSpace, Math.max(baseSpace * ratio, 10));
}

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

// DOM読み込み後にSwiper初期化
document.addEventListener('DOMContentLoaded', function() {
    const voiceInner = document.querySelector('.voice__inner'); // スライダー要素を取得

    if (typeof Swiper !== "undefined" && voiceInner) { // Swiperが定義されていて要素がある場合のみ
        let voiceSwiper = initVoiceSwiper();

        window.addEventListener('resize', function() {
            if (voiceSwiper) voiceSwiper.destroy(true, true); // 前のSwiperを破棄
            voiceSwiper = initVoiceSwiper(); // 再初期化
        });
    } else {
        console.warn("Swiperが未定義か、スライダー要素が見つかりません");
    }
});
