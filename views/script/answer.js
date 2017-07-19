/**
 * Created by baimao on 2017/7/18.
 */
$("form").submit(function(e){
    console.log('-------')
    e.preventDefault();
    $.post(
        $(this).attr("action"),
        $(this).serialize(),
        function(data){
            console.log(data);
            if(data.code == "success"){
                alert(data.msg);
                location.href = "/";
            }else{
                alert(data.msg);
            }
        }
    );
});