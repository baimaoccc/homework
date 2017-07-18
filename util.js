/**
 * Created by apple on 17/7/16.
 */
//获取注册ip
exports.changeIp = (ip)=>{
    var startIndex = ip.lastIndexOf(":") + 1;
    ip = ip.substr(startIndex);
    if (ip == 1) {
        ip = "127.0.0.1";
    }
    return ip;
}
//获取当前时间
exports.getCurTime  = ()=> {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    var str = year + "-" + (month + 1) + "-" + day;

    hours = hours >= 10 ? hours : "0" + hours;
    minutes = minutes >= 10 ? minutes : "0" + minutes;
    seconds = seconds >= 10 ? seconds : "0" + seconds;

    str += (" " + hours + ":" + minutes + ":" + seconds);
    return str;
}

