$('#logout').click(function () {
    if (confirm('确定要退出吗？')) {
        location.href = '/logout';
    }
});

function toLogin() {
    location.href = '/login';
}

function toAnswer(e) {
    console.log('--------');
    console.log(document.cookie);
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

