var exp = require('express');
var router = exp.Router();


var MyUser = require('../db').MyUser;
var Problem = require("../db").Problem;


router.get('/logout',function (req, res) {
    res.clearCookie('user');
    res.redirect('/login');
});

router.get('/question',function (req, res) {
    res.render('question',{
        title:'提问页面'
    });
});

router.get('/modify',function (req, res) {
    res.render('modify',{
        title:'修改个人资料'
    });
});

router.get('/login', function (req, res) {
    res.render('login', {
        title: '登录'
    });
});


//对根目录处理 当在域名输入栏访问8080端口时 使用render渲染到header.html
router.get('/', function (req, res) {
    var allUser = [];
    MyUser.find({}, function (err, users) {
        allUser = users;
        Problem.find({}, function (err, problems) {

            if (err) {
                res.json({
                    code: 'error',
                    message: '数据库查询出错'
                });
            } else {
                for (var i = 0; i < problems.length; i++) {
                    problems[i].id = problems[i]._id;
                    var obj = JSON.parse(problems[i].answers);

                    for (var k = 0; k < allUser.length; k++) {
                        if (allUser[k]._id == problems[i].createuser) {
                            problems[i].cuser = allUser[k];
                            break;
                        }
                    }

                    //遍历每个问题的回答对象 找出每个回答对应的发布者的具体信息
                    for (var j = 0; j < obj.length; j++) {

                        for (var k = 0; k < allUser.length; k++) {
                            if (allUser[k]._id == obj[j].id) {
                                obj[j].user = allUser[k];
                                break;
                            }
                        }
                    }
                    problems[i].answer = obj;
                }
                problems.reverse();

                if (req.cookies.user) {
                    res.render('header', {
                        title: '首页',
                        //因为在登录成功时已经缓存了cookie 这时只需要从浏览器中取出cookie值用于设置首页的当前用户信息
                        user: req.cookies.user,
                        datas: problems
                    });
                } else {
                    res.render('header', {
                        title: '首页',
                        datas: problems
                    });
                }
            }
        })
    });
});


module.exports = router;