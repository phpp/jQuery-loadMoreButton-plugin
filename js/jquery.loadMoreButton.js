(function($) {
    $.fn.loadMoreButton = function(options) {
        var opt = $.extend({
            items_selector: 'ul li',
            items_per_page: 10,
            btn_text: 'Load more',
            btn_cls: 'button',
            btn_id: 'load_more',
            ajaxloader: true
        }, options);

        var btn = create_button({
            text: opt.btn_text,
            cls: opt.btn_cls,
            id: opt.btn_id
        }),
                num = opt.items_per_page,
                selector = '#' + $(this).attr('id');
        $(opt.items_selector).hide();
        $(opt.items_selector).slice(0, opt.items_per_page).show();
        $(selector).append(btn);
        check_button(opt);
        $('#' + opt.btn_id).click(function(e) {
            if (opt.ajaxloader) {
                $('#' + opt.btn_id).hide();
                $(selector).append('<img src="img/ajaxloader.gif" id="ajaxloader">');
                setTimeout(function() {
                    $('#ajaxloader').remove();
                    $(opt.items_selector).slice(opt.items_per_page, opt.items_per_page + num).show();
                    opt.items_per_page += num;
                    check_button(opt);
                }, 500);
            } else {
                $(opt.items_selector).slice(opt.items_per_page, opt.items_per_page + num).show();
                opt.items_per_page += num;
                check_button(opt);
            }
        });
    }

    function create_button(params) {
        return '<button class="' + params.cls + '" id="' + params.id + '">' + params.text + '</button>';
    }

    function check_button(opt) {
        var current_items = $(opt.items_selector + ":visible").length;
        if (current_items == $(opt.items_selector).length) {
            $('#' + opt.btn_id).hide();
        } else {
            $('#' + opt.btn_id).show();
        }
    }

    function ajaxloader(selector, opt) {
        if (opt.ajaxloader) {
            $('#' + opt.btn_id).hide();
            $(selector).append('<img src="img/ajaxloader.gif" id="ajaxloader">');
            setTimeout(function() {
                $('#ajaxloader').remove();
                $('#' + opt.btn_id).show();
            }, 5000);
        }
    }

}(jQuery));
