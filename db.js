var mongoose = require('mongoose');
mongoose.connect('localhost/fullVersion');
var db = mongoose.connection;
db.on('open', function () {
    console.log('数据库连接成功');
});

db.on('error', function () {
    console.log('数据库连接失败');
});


var Schema = mongoose.Schema({
    img:String,
    account: String,
    pwd: String,
    sex: String,
    email: String,
    course: String
}, {
    versionKey: false
});

var MyUser = mongoose.model("User", Schema);


exports.Problem = mongoose.model("Problem", new mongoose.Schema({
    title: String,
    time:String,
    ip:String,
    createuser:String,
    answers:String,
}, {
    versionKey:false
}));


exports.MyUser = MyUser;

