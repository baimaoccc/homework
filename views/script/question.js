$("form").submit(function(e){
    e.preventDefault();
    $.post(
        $(this).attr("action"),
        $(this).serialize(),
        function(data){
            if(data.code == "success"){
                location.href = "/";
            }else{
                alert(data.msg);
            }
        }
    )
});