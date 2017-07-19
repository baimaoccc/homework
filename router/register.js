var exp = require('express');
var router = exp.Router();

var MyUser = require('../db').MyUser;



router.post('/registerNewUser',function (req, res) {
    var sam = new MyUser({
        //在注册时给每个用户一张默认头像图片
        img:'img/my.jpg',
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


//检查用户名是否已被注册
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


module.exports = router;