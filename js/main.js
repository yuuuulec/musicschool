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
$(function () {
    const header = $('#header');
    const feature = $('.message');

    function checkScroll() {
        const scrollTop = $(window).scrollTop();
        const target = feature.offset().top;

        let offset = 0;

        if (scrollTop >= target - offset) {
            header.addClass('header-scroll');
        } else {
            header.removeClass('header-scroll');
        }
    }

    $(window).on('scroll', checkScroll);
    $(window).on('resize', checkScroll);
    checkScroll();
});

// お問い合わせ・トップに戻るボタン（スクロール制御）

function initFloatingBtns() {
    const fv = $('.fv');
    const $floatBtns = $('.c-to-top, .c-contact__btn');

    // 初期は非表示（ちらつき防止）
    $floatBtns.hide();

    function checkFloatingBtns() {
        const fvExists = fv.length > 0;
        const fvHeight = fvExists ? fv.outerHeight() : 0;
        const scroll = $(window).scrollTop();

        if (fvExists) {
            // FVがある → FVを完全に過ぎたら表示
            if (scroll > fvHeight) {
                $floatBtns.fadeIn();
            } else {
                $floatBtns.fadeOut();
            }
        } else {
            // FVがない → 常に表示
            $floatBtns.fadeIn();
        }
    }

    // イベント登録（重複防止）
    $(window).off('scroll resize load', checkFloatingBtns);
    $(window).on('scroll resize load', checkFloatingBtns);

    // 初期実行（FVの高さが反映されるまで少し待つ）
    setTimeout(checkFloatingBtns, 200);

    // スムーズスクロール（重複登録防止）
    $('.c-to-top a').off('click').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 600);
    });
}

// 通常ページ読み込み時
$(function () {
    initFloatingBtns();
});

// 初回ロード
$(document).ready(function() {
    initFloatingBtns();
});

// ページ遷移（PJAXなど）後にも再実行
$(document).on('pjax:end', function () {
    initFloatingBtns();
});





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
