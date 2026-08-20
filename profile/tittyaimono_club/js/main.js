$(function () {

    /* =================================
       FVアニメーション
    ================================= */

    const fvTitle = $('.fv_title span');

    // ① ひらがなを1文字ずつポンポン
    fvTitle.each(function (index) {

        $(this).delay(index * 120).queue(function (next) {

            $(this).addClass('fv_char_show');

            next();

        });

    });


    // ② 背景・イラスト
    const titleTime = fvTitle.length * 120 + 400;

    setTimeout(function () {

        $('.fv_bg').addClass('fv_bg_show');

    }, titleTime);


    // ③ バナー
    setTimeout(function () {

        $('.concert_banner').addClass('banner_show');

    }, titleTime + 800);



    /* =================================
       スクロールアニメーション
    ================================= */

    let animatedSections = [];

    function sectionAnimation() {

        $('.section').each(function (index) {

            // すでに表示済みなら何もしない
            if (animatedSections[index]) {
                return;
            }


            const section = $(this);

            const title = section.find('.section_title');

            const content = section.find('.content_item');


            // タイトルの位置
            const titleTop = title[0].getBoundingClientRect().top;

            const titleBottom = title[0].getBoundingClientRect().bottom;

            const windowHeight = $(window).height();


            /*
             * タイトルが「完全に画面内」に入ったら
             */
            if (
                titleTop >= 0 &&
                titleBottom <= windowHeight
            ) {

                animatedSections[index] = true;


                // ① タイトル表示
                title.addClass('title_show');


                // ② 0.5秒後に中身
                setTimeout(function () {

                    content.each(function (contentIndex) {

                        $(this)
                            .delay(contentIndex * 100)
                            .queue(function (next) {

                                $(this).addClass('content_show');

                                next();

                            });

                    });

                }, 500);

            }

        });

    }


    // スクロール時
    $(window).on('scroll', function () {

        sectionAnimation();

    });


    // ページ読み込み時にも一度チェック
    sectionAnimation();


});