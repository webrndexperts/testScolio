/**
 * load loading
 */
$(document).ajaxStart(function () {
    $("#ajax_loader").show();
}).ajaxStop(function () {
    $("#ajax_loader").hide('slow');
});
/**
 * change label
 */
$(document).on('keyup', '.edit-menu-item-title', function () {
    var title = $(this).val();
    var index = $('.edit-menu-item-title').index($(this));
    $('.menu-item-title').eq(index).html(title);
});
/**
 * change url
 */
$(document).on('keyup', '.edit-menu-item-url', function () {
    var url = $(this).val();
    var index = $('.edit-menu-item-url').index($(this));
    /**
     * limit string
     */
    var result = url.slice(0, 30) + (url.length > 30 ? "..." : "");
    $('.menu-item-link').eq(index).html(result);
});
/**
 * add item menu
 * type : default or custom
 */
function addItemMenu(e, type) {
    let data = [];
    let form = $(e).parents('form');
    if (type == "default") {
        if (!form.find('input[name="label"]').val() || !form.find('input[name="url"]').val()) {
            alert('Please enter label or url');
            return;
        }
        data.push({
            label: form.find('input[name="label"]').val(),
            url: form.find('input[name="url"]').val(),
            role: form.find('select[name="role"]').val(),
            icon: form.find('input[name="icon"]').val(),
            id: $('#idmenu').val()
        });
    } else {
        let checkbox = form.find('input[name="menu_id"]:checked');
        let flag = false;
        for (let index = 0; index < checkbox.length; index++) {
            let element = $(checkbox[index]);
            data.push({
                label: element.attr('data-label'),
                url: element.attr('data-url'),
                role: form.find('select[name="role"]').val(),
                icon: element.attr('data-icon'),
                id: $('#idmenu').val()
            });
            if (!element.attr('data-label') || !element.attr('data-url')) {
                flag = true;
            }
        }
        if (flag) {
            alert('Please enter label or url');
            return;
        }
    }
    $.ajax({
        data: {
            data: data
        },
        url: URL_CREATE_ITEM_MENU,
        type: 'POST',
        success: function (response) {
            window.location.reload();
        },
        complete: function () { }
    });
}

function updateItem(id = 0) {
    if (id) {
        var label = $('#label-menu-' + id).val();
        var clases = $('#clases-menu-' + id).val();
        var url = $('#url-menu-' + id).val();
        var icon = $('#icon-menu-' + id).val();
        var target = $('#target-menu-' + id).val();
        var role_id = 0;
        if ($('#role_menu_' + id).length) {
            role_id = $('#role_menu_' + id).val();
        }
        if (!label || !url) {
            alert('Please enter label or url');
            return;
        }
        var data = {
            label: label,
            clases: clases,
            url: url,
            icon: icon,
            target: target,
            role_id: role_id,
            id: id
        };
    } else {
        var arr_data = [];
        let flag = false;
        $('.menu-item-settings').each(function (k, v) {
            var id = $(this)
                .find('.edit-menu-item-id')
                .val();
            var label = $(this)
                .find('.edit-menu-item-title')
                .val();
            var clases = $(this)
                .find('.edit-menu-item-classes')
                .val();
            var url = $(this)
                .find('.edit-menu-item-url')
                .val();
            var icon = $(this)
                .find('.edit-menu-item-icon')
                .val();
            var role = $(this)
                .find('.edit-menu-item-role')
                .val();
            var target = $(this)
                .find('select.edit-menu-item-target option:selected')
                .val();
            if (!label || !url) {
                flag = true;
            }
            arr_data.push({
                id: id,
                label: label,
                class: clases,
                link: url,
                icon: icon,
                target: target,
                role_id: role
            });
        });
        if (flag) {
            alert('Please enter label or url');
            return;
        }
        var data = {
            dataItem: arr_data
        };
    }
    $.ajax({
        data: data,
        url: URL_UPDATE_ITEM_MENU,
        type: 'POST',
        beforeSend: function (xhr) {
            if (id) { }
        },
        success: function (response) { },
        complete: function () {
            if (id) { }
        }
    });
}

function actualizarMenu(serialize) {
    if ($('#menu-name').val()) {
        $.ajax({
            dataType: 'json',
            data: {
                data: serialize,
                menuName: $('#menu-name').val(),
                idMenu: $('#idmenu').val(),
                class: $('#menu-class').val()
            },
            url: URL_UPDATE_ITEMS_AND_MENU,
            type: 'POST',
            success: function (response) {
                /**
                 * update text option
                 */
                $(`select[name="menu"] option[value="${$('#idmenu').val()}"]`).html($('#menu-name').val());
            }
        });
    }else{
        alert('Please enter name menu!');
    }
}

function deleteItem(id) {
    $.ajax({
        dataType: 'json',
        data: {
            id: id
        },
        url: URL_DELETE_ITEM_MENU,
        type: 'POST',
        success: function (response) {
            window.location = URL_FULL;
        }
    });
}

function deleteMenu() {
    var r = confirm('Do you want to delete this menu ?');
    if (r == true) {
        $.ajax({
            dataType: 'json',
            data: {
                id: $('#idmenu').val()
            },
            url: URL_DELETE_MENU,
            type: 'POST',
            success: function (response) {
                if (!response.error) {
                    alert(response.resp);
                    window.location = URL_CURRENT;
                } else {
                    alert(response.resp);
                }
            }
        });
    } else {
        return false;
    }
}

function createNewMenu() {
    if (!!$('#menu-name').val()) {
        $.ajax({
            dataType: 'json',
            data: {
                name: $('#menu-name').val(),
                class: $('#menu-class').val(),
            },
            url: URL_CREATE_MENU,
            type: 'POST',
            success: function (response) {
                window.location = URL_CURRENT + '?menu=' + response.resp;
            }
        });
    } else {
        alert('Please enter name menu tstgvbcv');
        $('#menu-name').focus();
        return false;
    }
}


$(document).ready(function () {
    if ($('#nestable').length) {
        /**
         * https://github.com/RamonSmit/Nestable2#configuration
         */
        $('#nestable').nestable({
            expandBtnHTML: '',
            collapseBtnHTML: '',
            maxDepth: 5, //number of levels an item can be nested
            callback: function (l, e) {
                updateItem();
                actualizarMenu(l.nestable('toArray'));
            }
        });
    }
});