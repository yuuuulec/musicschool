//お問い合わせ　トップに戻るボタン　スクロール
$(function() {
    const headerHeight = $('#header').outerHeight(); 
    const fv = $('.fv'); 
    let fvHeight = fv.outerHeight();

    $(window).on('load resize', function() {
        fvHeight = fv.outerHeight();
    });

    const showOffset = headerHeight + fvHeight;

    $(window).on('scroll', function() {
        const scroll = $(window).scrollTop();
        if (scroll > showOffset) {
            $('.c-to-top, .c-contact__btn').fadeIn();
        } else {
            $('.c-to-top, .c-contact__btn').fadeOut();
        }
    });

    // 初期非表示
    $('.c-to-top, .c-contact__btn').hide();

    // トップへスムーズスクロール
    $('.c-to-top a').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 600);
    });
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
