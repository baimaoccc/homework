var exp = require('express');
var router = exp.Router();
var MyUser = require('../db').MyUser;
var Problem = require("../db").Problem;

router.get('/register', function (req, res) {
    res.redirect('toRegister');
});

router.get('/toRegister',function (req, res) {
    res.render('register',{
        title:'注册页面'
    });
});

router.post('/checkLogin', function (req, res) {
    MyUser.find({account: req.body.accountName, pwd: req.body.pwd}, function (err, docus) {
        if (err) {
            res.json({
                code: 'error',
                message: '数据库查询出错'
            });
        } else {
            if (docus.length > 0) {
                res.cookie("user", docus[0]);
                res.json({
                    code: 'success',
                    message: '登录成功'
                });
            } else {
                res.json({
                    code: 'error',
                    message: '用户名或者密码错误'
                });
            }
        }
    });
});
router.get('/', function (req, res) {
    Problem.find({},function(err,datas){

        if(err){
            res.json({
                code: 'error',
                message: '数据库查询出错'
            })
        }else {

            for(var i=0;i<datas.length;i++){
                datas[i].id = datas[i]._id;
                delete datas[i]._id;
                var obj = JSON.parse(datas[i].answers);
                console.log(obj);
                datas[i].answer = obj;
            }
            datas.reverse();
            if (req.cookies.user) {
                res.render('header.html', {
                    title: '首页',
                    user: req.cookies.user,
                    datas:datas
                });
            } else {
                res.render('header.html', {
                    title: '首页'
                });
            }
        }
    })
});

router.get('/login',function (req, res) {
    res.render('login', {
        title: '登录'
    });
});


module.exports = router;