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
    // *ここで`hide()`を使うと、CSSで`display: none;`を設定していない場合、初期チェックまで要素が見えてしまいます。
    // *CSSで初期状態を非表示にする方が推奨されますが、このまま進めます。
    $floatBtns.hide();

    function checkFloatingBtns() {
        const fvExists = fv.length > 0;
        // FVの高さは、関数が呼ばれるたびに再取得することで、リサイズや遅延読み込みに対応します。
        const fvHeight = fvExists ? fv.outerHeight() : 0;
        const scroll = $(window).scrollTop();

        if (fvExists) {
            // FVがある → FVを完全に過ぎたら表示
            // FVの高さ（fvHeight）ではなく、FVの下端のY座標を基準にするのがより正確です。
            // fv.offset().top + fvHeight となることがほとんどですが、offset().topが0でないページ構成もあり得るので、
            // スクロール量が fvの高さ を超えたら、という現在のロジックでOKです。
            if (scroll > fvHeight) {
                $floatBtns.fadeIn(300); // フェードインに時間を持たせる
            } else {
                $floatBtns.fadeOut(300); // フェードアウトに時間を持たせる
            }
        } else {
            // FVがない → 常に表示（固定pxの場合、条件分岐をここに加える）
            // ページ上部からの固定pxでの表示が必要な場合は、以下のブロックを修正します。
            const displayPx = 300; // 例: 300pxスクロールしたら表示

            if (scroll > displayPx) {
                $floatBtns.fadeIn(300);
            } else {
                $floatBtns.fadeOut(300);
            }
        }
    }

    // イベント登録（重複防止）
    // load イベントを追加することで、FVの高さが確定した後に一度チェックが走るようにします。
    $(window).off('scroll resize load', checkFloatingBtns);
    $(window).on('scroll resize load', checkFloatingBtns);

    // スムーズスクロール（重複登録防止）
    $('.c-to-top a').off('click').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 600);
    });
}

// ページ内の全アセット（画像など）読み込み完了後に初期実行
// これにより、FVの高さが確実に反映されます。
$(window).on('load', function () {
    initFloatingBtns();
});

// DOM構築完了後に実行（FVがない場合や、初期表示時にFVの高さが確定している場合に対応）
$(function () {
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
