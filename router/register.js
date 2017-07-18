var exp = require('express');
var router = exp.Router();

var MyUser = require('../db').MyUser;



router.post('/registerNewUser',function (req, res) {
    var sam = new MyUser({
        account:req.body.accountName,
        pwd:req.body.pwd,
        sex:req.body.sex,
        email:req.body.email,
        course:req.body.course
    });
    sam.save(function (error) {
        if (error) {
            res.json({
                code:'error',
                message:'用户信息存储数据库失败'
            })
        } else {
            res.json({
                code:'success',
                message:'注册成功'
            });
        }
    });
});

router.post('/checkName',function (req, res) {
    MyUser.find({account:req.body.accountName},function(err,docus) {
        if (err) {
            res.json({
                code:'error',
                message:'数据库查询出错'
            });
        } else {
            if (docus.length > 0) {
                res.json({
                    code:'error',
                    message:'用户名已经存在'
                });
            }
            else  {
                res.json({
                    code:'success',
                    message:'恭喜💐 该用户名未被注册'
                });
            }
        }
    });
});


router.get('/login',function (req, res) {
    res.redirect('/login.html');
});

router.get('/loginhh',function (req, res) {
    res.render('/login',{
        title:'登录页面'
    });
})

module.exports = router;