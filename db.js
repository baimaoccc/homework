var mongoose = require('mongoose');
var db = mongoose.connect('localhost/fullVersion');
db.on('open',function () {
    console.log('数据库连接成功');
});

db.on('error',function () {
    console.log('数据库连接失败');
});



var Schema = mongoose.Schema({
    accout:String,
    pwd:String,
    commentInfo:String
},{
    versionKey:false
});

var User = mongoose.model("MyUser");
var MyUser = mongoose.model(User,Schema);
