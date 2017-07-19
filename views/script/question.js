$("form").submit(function(e){
    e.preventDefault();
    $.post(
        $(this).attr("action"),
        $(this).serialize(),
        function(data){
            if(data.code == "success"){
                //问题提交成功之后跳转到首页，当首页点击问题时跳转回答页面 该动作由首页触发
                //script/header.js文件中
                location.href = "/";
            }else{
                changeModelText(data.msg);
                $('#myModal').modal('show');
            }
        }
    )
});