$('#accountName').blur(function () {
    if ($('#accountName').val().trim().length == 0) {
        $('#accountName').siblings('span').text('用户名必填');
    } else {
        //注册时对account校验是否已注册
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

$('form').submit(function (event) {
    event.preventDefault();
    if ($('#accountName').siblings('span').text('恭喜💐 该用户名未被注册') && $('#pwd').siblings('span').text('') &&  $('#confirm_pwd').siblings('span').text('')) {
        $.post(
            '/registerNewUser',
            $(this).serialize(),
            function (data) {
                if(data.code == 'success') {
                    changeModelText(data.message);
                    $('#myModal').modal('toggle').on('hide.bs.modal',function () {
                        location.href = 'login';
                    });
                } else {
                    changeModelText(data.message);
                    $('#myModal').modal('toggle');
                }
            }
        )
    }
});




