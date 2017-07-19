/**
 * Created by baimao on 2017/7/18.
 */
$("form").submit(function(e){
    console.log('-------');
    e.preventDefault();
    $.post(
        $(this).attr("action"),
        $(this).serialize(),
        function(data){
            console.log(data);
            if(data.code == "success"){
                changeModelText(data.msg);
                $('#myModal').modal('show').on('hide.bs.modal',function () {
                    location.href = '/';
                });
            }
            else{
                changeModelText(data.msg);
                $('#myModal').modal('show');
            }
        }
    );
});