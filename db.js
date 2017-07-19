var mongoose = require('mongoose');
mongoose.connect('localhost/fullVersion');
var db = mongoose.connection;
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

db.on('open', function () {
    console.log('数据库连接成功');
});

db.on('error', function () {
    console.log('数据库连接失败');
});


var UserSchema = mongoose.Schema({
    img:String,
    account: String,
    pwd: String,
    sex: String,
    email: String,
    course: String
}, {
    versionKey: false
});

var MyUser = mongoose.model("User", UserSchema);


exports.Problem = mongoose.model("Problem", new mongoose.Schema({
    title: String,
    time: String,
    ip: String,
    createuser: {type: Schema.Types.ObjectId, ref: 'User'},
    answers: [{type: Schema.Types.ObjectId, ref: "Answer"}]
}, {
    versionKey:false
}));

exports.Answer = mongoose.model("Answer",new mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    problem: {type: Schema.Types.ObjectId, ref: "Problem"},
    title: String,
    ip: String,
    time: String
},{
    versionKey:false
}))
exports.MyUser = MyUser;

