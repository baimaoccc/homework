$('#logout').click(function () {
    if (confirm('确定要退出吗？')) {
        location.href = '/logout';
    }
});

function toLogin() {
    location.href = '/login';
}

