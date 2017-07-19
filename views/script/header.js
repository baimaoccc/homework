$('#logout').click(function () {
    if (confirm('确定要退出吗？')) {
        location.href = '/logout';
    }
});


function toAnswer(e) {
    console.log(document.cookie);

    // 在点击问题项时需要判断是否是登录状态 （判断cookie值是否存在）
    if(document.cookie){
        console.log($(e.currentTarget).data("index"));
        var index = $(e.currentTarget).data("index");
        location.href = "/answer/" + index;
    }else{
        if (confirm('是否立即登录？')) {
            location.href = '/login';
        }
    }

}

