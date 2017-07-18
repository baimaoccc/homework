$('#accountName').blur(function () {
    if ($('#accountName').val().trim().length == 0) {
        $('#accountName').siblings('span').text('用户名必填');
    } else {
        $('#accountName').siblings('span').text('');
    }
});

$('#pwd').blur(function () {
    if ($('#pwd').val().trim().length == 0) {
        $('#pwd').siblings('span').text('用户名必填');
    } else {
        $('#pwd').siblings('span').text('');
    }
});

$('form').submit(function (event) {
    event.preventDefault();
    if ($('#accountName').siblings('span').text('') && $('#pwd').siblings('span').text('')) {
        $.post(
            'checkLogin',
            $(this).serialize(),
            function (data) {
                if (data.code == 'success') {
                    location.href = 'header'
                } else {
                    alert(data.message);
                }

            }
        );
    }
});

$.get(
    '/login',
    {},
    function () {}
);
