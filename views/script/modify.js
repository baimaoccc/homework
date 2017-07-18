/**
 * Created by baimao on 2017/7/18.
 */
$('form').submit(function (event) {
    event.preventDefault();
    var files = new FormData(this);

    console.log(files);
        $.post({
            url:'modifyHeader',
            data:files,
            contentType:false,
            processData:false,
            success:function (data, textStatus, jqXHR) {
                if (data.code == 'success') {
                    location.href = '/';
                }
            }
        });
});