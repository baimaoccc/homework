$('#logout').click(function () {
    console.log('hhhhhh');
    if (confirm('确定要提交吗？')) {
        location.href = '/logout';
    }

});