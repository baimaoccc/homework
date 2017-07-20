var exp = require('express');
var router = exp.Router();
var MyUser = require('../db').MyUser;
var Problem = require('../db').Problem;
var util = require('../util');

//对form表单的逻辑处理
router.post("/saveAnswer", function (req, res) {
    var answertilte = req.body.title;
    var answer = {};

    //从浏览器回去回答的信息，包括时间等
    answer.id = req.cookies.user._id;
    answer.title = answertilte;
    answer.time = util.getCurTime();
    answer.ip = util.changeIp(req.ip);


    Problem.findById(req.body.problemid, function (err, data) {
        if (err) {
            res.json({
                code: "error",
                msg: "数据库错误"
            });
        } else {

            var problem = data;
            var arr = JSON.parse(problem.answers);
            arr.push(answer);
            problem.answers = JSON.stringify(arr);
            Problem.findByIdAndUpdate(req.body.problemid, problem, function (err) {
                if (err) {
                    console.log(err);
                    res.json({
                        code: "error",
                        msg: "回答问题失败"
                    })
                } else {
                    res.json({
                        code: "success",
                        msg: "回答问题成功"
                    })
                }
            });

        }
    })
});
//该路由的处理逻辑由首页点击回答问题后触发
router.get("/answer/:id", function (req, res) {
    var id = req.params.id;
    Problem.findById(req.params.id)


    // var allUser = [];
    // MyUser.find({},function(err,users){
    //     allUser = users;
    // });
    // Problem.findById(req.params.id, function (err, data) {
    //     if (err) {
    //         //此时回传的浏览器页面是首页
    //         res.json({
    //             code: "error",
    //             msg: "数据库错误"
    //         });
    //     } else {
    //
    //         //将数据库中查询到的结果转为对象problem ，
    //         // problem仅用于展示，不是完全的数据库内容
    //
    //         var problem = data.toObject();
    //         for(var i=0;i<allUser.length;i++) {
    //
    //             //当遍历用户数组，目的使用用户信息给problem设置其余不用存在数据库中的信息
    //             if (allUser[i]._id == problem.createuser) {
    //                 problem.cuserimg = "../" + allUser[i].img;
    //
    //                 problem.cuseraccount = allUser[i].account;
    //                 res.render("answer", {
    //                     title:'回答问题',
    //                     problem: problem,
    //
    //                     //每个问题的id不同
    //                     id: req.params.id
    //                 });
    //                 break;
    //             }
    //         }
    //
    //
    //     }
    // })
});

module.exports = router;