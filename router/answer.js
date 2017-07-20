var exp = require('express');
var router = exp.Router();
var util = require('../util');

var Answer = require("../db").Answer;
var Problem = require('../db').Problem;
//对form表单的逻辑处理
router.post("/saveAnswer", function (req, res) {
    var answertilte = req.body.title;
    var answer = {}
    answer.user = req.cookies.user._id;
    answer.title = answertilte;
    answer.time = util.getCurTime();
    answer.ip = util.changeIp(req.ip);
    answer.problem = req.body.problemid;

    var entity = new Answer(answer);
    //保存回答记录
    entity.save(function (err, data) {
        if (err) {
            res.json({
                code: "error",
                msg: "数据库错误"
            })
        } else {
            //将回答记录保存后获取回答记录的id
            answerId = data._id;
            //用问题的id 找出该问题
            Problem.findOne({_id: req.body.problemid})
                .populate('problem')
                .exec(function (err, data) {
                    if (err) {
                        res.json({
                            code: "error",
                            msg: "数据库错误"
                        })
                    } else {
                        //将查询的结果中的answers中追加回答，只要存回答的id，可以使用populate方法将id转成对象
                        data.answers.push(answerId);

                        //因为保存一个回答后，问题也应该有追加的回答，所以需要在数据库中修改一下当前这个问题
                        Problem.update({_id: data._id}, data, function (err) {
                            if (err) {
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
        }
    })


    // Problem.findById(req.body.problemid, function (err, data) {
    //     if (err) {
    //         res.json({
    //             code: "error",
    //             msg: "数据库错误"
    //         });
    //     } else {
    //         var problem = data.toObject()
    //         var obj = JSON.parse(problem.answers);
    //         obj.push(answer);
    //         problem.answers = JSON.stringify(obj);
    //         Problem.findByIdAndUpdate(req.body.problemid, problem, function (err) {
    //             if (err) {
    //                 console.log(err);
    //                 res.json({
    //                     code: "error",
    //                     msg: "回答问题失败"
    //                 })
    //             } else {
    //                 res.json({
    //                     code: "success",
    //                     msg: "回答问题成功"
    //                 })
    //             }
    //         })
    //
    //     }
    // })
})

//该路由的处理逻辑由首页点击回答问题后触发
router.get("/answer/:id", function (req, res) {
    var id = req.params.id;
    Problem.findById(id)
        .populate('createuser',{img:1,account:1,_id:0})
        .exec(function(err,data){
            var problem = data;
            problem.createuser.img = "../"+problem.createuser.img;
            if(err){
                console.log(err);
                res.json({
                    code:"error",
                    msg:"数据库错误"
                })
            }else{
                res.render("answer",{
                    problem:problem,
                    id:req.params.id,
                    title:"回答"
                })
            }
        })
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