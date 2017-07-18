$('#logout').click(function () {
    if (confirm('确定要提交吗？')) {
        location.href = '/logout';
    }
});