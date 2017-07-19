var exp = require('express');
var router = exp.Router();

//引入两张表
var MyUser = require('../db').MyUser;


router.get('/register', function (req, res) {
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
                //在登录成功时在浏览器中设置了一个cookie为user,
                // 值为一个MyUser的一条记录 MyUser里存放的都是对象
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




module.exports = router;