$(function () {

    // レッスン項目
    const lessonFields = $('.form_age, .form_voice_type, .form_lesson_purpose');

    // 演奏依頼項目
    const performanceFields = $('.form_venue, .form_datetime, .form_piano, .form_details');

    // 最初はすべて非表示
    lessonFields.hide();
    performanceFields.hide();

    // 最初は追加項目のrequiredを解除
    lessonFields.find('input, select, textarea').prop('required', false);
    performanceFields.find('input, select, textarea').prop('required', false);

    // お問い合わせ内容が変更されたとき
    $('#purpose').on('change', function () {

        const purpose = $(this).val();

        // いったん全部非表示
        lessonFields.hide();
        performanceFields.hide();

        // いったん追加項目のrequiredを全部解除
        lessonFields.find('input, select, textarea').prop('required', false);
        performanceFields.find('input, select, textarea').prop('required', false);

        // レッスン
        if (purpose === 'lesson') {
            lessonFields.show();

            // 年齢と声種とレッスンの目的だけ必須
            $('#age').prop('required', true);
            $('#voice_type').prop('required', true);
            $('#lesson_purpose').prop('required', true);
        }

        // 演奏依頼
        if (purpose === 'performance') {
            performanceFields.show();

            // 会場・希望日時・依頼詳細だけ必須
            $('#venue').prop('required', true);
            $('#datetime').prop('required', true);
            $('#details').prop('required', true);
        }

    });

});

$(function () {

    $('#contact_bottom .contact_btn').on('click', function () {

        // エラーメッセージを一度空にする
        $('#error_message').empty();

        const errors = [];

        // 表示されている必須項目をチェック
        $('.form_row > div:visible').each(function () {

            const $item = $(this);
            const $required = $item.find('[required]');

            if ($required.length === 0) {
                return;
            }

            let empty = false;

            $required.each(function () {

                if ($(this).is(':radio')) {

                    const radioName = $(this).attr('name');

                    if (!$('input[name="' + radioName + '"]:checked').length) {
                        empty = true;
                    }

                } else if ($(this).val() === '') {
                    empty = true;
                }

            });

            if (empty) {

                // labelの文字を取得
                let label = $item.find('label').first().clone();

                label.find('small').remove();

                const labelText = label.text().trim();

                errors.push(
                    '・' + labelText + 'の必須項目が未記入です。'
                );
            }

        });

        // 個人情報保護方針の同意チェック
        if (!$('#agree').prop('checked')) {
            errors.push('・個人情報保護方針への同意が必要です。');
        }

        // エラーがあった場合
        if (errors.length > 0) {

            $('#error_message').html(
                errors.join('<br>')
            );

            return false;
        }

        // エラーがなければ送信
        $('form').submit();

    });

});

$(function () {

    function sectionTitleAnimation() {

        $('.sectiontitle').each(function () {

            const rect = this.getBoundingClientRect();

            // セクションタイトル全体が画面内に入ったら
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                $(this).addClass('is-visible');
            }

        });

    }

    $(window).on('scroll', sectionTitleAnimation);

    // ページ読み込み時にも一度チェック
    sectionTitleAnimation();

});

$(function () {

    function profileAnimation() {

        $('.profile_wrap').each(function () {

            const rect = this.getBoundingClientRect();

            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {

                $('.profile_img').addClass('is-visible');

                setTimeout(function () {
                    $('.profile_text').addClass('is-visible');
                }, 200);

            }

        });

    }

    $(window).on('scroll', profileAnimation);

    profileAnimation();

});