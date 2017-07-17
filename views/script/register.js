$('form').submit(function (event) {
    event.preventDefault();
    if ($('#pwd').siblings('span').text('') &&  $('#confirm_pwd').siblings('span').text('')) {
        $.post(
            '/registerNewUser',
            $(this).serialize(),
            function (data) {
                alert(data.message);
            }
        )
    }
});



$('#accountName').blur(function () {
    if ($('#accountName').val().trim().length == 0) {
        $('#accountName').siblings('span').text('用户名必填');
    } else {
        $('#accountName').siblings('span').text('');
        $.post(
            '/checkName',
            {accountName: $('#accountName').val()},
            function (data) {
                console.log(data);
                $('#accountName').siblings('span').text(data.message);
            }
        );
    }
});

$('#pwd').blur(function () {
    if ($('#pwd').val().trim().length == 0) {
        $('#pwd').siblings('span').text('密码必填');
    } else {
        $('#pwd').siblings('span').text('');
    }
});

$('#confirm_pwd').blur(function () {
    if ($('#pwd').val().trim() != $('#confirm_pwd').val().trim()) {
        $('#confirm_pwd').siblings('span').text('两次输入密码不一致');
    } else {
        $('#confirm_pwd').siblings('span').text('');
    }
});
