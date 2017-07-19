var exp = require('express');
var router = exp.Router();
var MyUser = require('../db').MyUser;
var Problem = require("../db").Problem;


router.get('/register', function (req, res) {
    res.redirect('toRegister');
});

router.get('/toRegister', function (req, res) {
    res.render('register', {
        title: '注册页面'
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
    Problem.find({})
        .populate('createuser answers')
        .exec(function (err, data) {
            //console.log(data[0].answers[0]);
            if (err) {
                res.json({
                    code: "error",
                    msg: "数据库错误"
                })
            } else {
                var optons = [{
                    path: 'answers.user',
                    select: {account: 1, img: 1},
                    model: 'User',
                }];
                Problem.populate(data, optons, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        var problems = data;
                        console.log(data);
                        problems.reverse();

                        if (req.cookies.user) {
                            res.render('header', {
                                title: '首页',
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
            }

        });


    // var allUser = [];
    // MyUser.find({}, function (err, users) {
    //     allUser = users;
    //     Problem.find({}, function (err, problems) {
    //
    //         if (err) {
    //             res.json({
    //                 code: 'error',
    //                 message: '数据库查询出错'
    //             })
    //         } else {
    //             for (var i = 0; i < problems.length; i++) {
    //                 problems[i].id = problems[i]._id;
    //                 var obj = JSON.parse(problems[i].answers);
    //
    //
    //                 for (var k = 0; k < allUser.length; k++) {
    //                     if (allUser[k]._id == problems[i].createuser) {
    //                         problems[i].cuser = allUser[k];
    //                         break;
    //                     }
    //                 }
    //                 for (var j = 0; j < obj.length; j++) {
    //
    //                     for (var k = 0; k < allUser.length; k++) {
    //                         if (allUser[k]._id == obj[j].id) {
    //                             obj[j].user = allUser[k];
    //                             break;
    //                         }
    //                     }
    //                 }
    //                 problems[i].answer = obj;
    //             }
    //             problems.reverse();
    //
    //             if (req.cookies.user) {
    //                 res.render('header', {
    //                     title: '首页',
    //                     user: req.cookies.user,
    //                     datas: problems
    //                 });
    //             } else {
    //                 res.render('header', {
    //                     title: '首页',
    //                     datas: problems
    //                 });
    //             }
    //         }
    //     })
    // })


});

router.get('/login', function (req, res) {
    res.render('login', {
        title: '登录'
    });
});


module.exports = router;