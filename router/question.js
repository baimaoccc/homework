/**
 * Created by apple on 17/7/18.
 */
var util = require("../util");
const express = require("express");
var Problem = require("../db").Problem;
var MyUser = require("../db").MyUser;
var Answer = require("../db").Answer;


var router = express.Router();


/*
 title: String,
 time:String,
 ip:String,
 createuser:Object,
 answers:[Object]
 */



//问题页面的提交处理 将用户的问题保存在数据库中
router.post("/api/saveproblem", function (req, res) {
    var title = req.body.title;
    var problem = {};
    problem.title = title;
    problem.time = util.getCurTime();
    problem.ip = util.changeIp(req.ip);

    //问题的提出者存放一个MyUser表记录的_id字段，
    // 该字段是Mongodb数据库自动设置的id字段，在注册时不需要设置该字段
    problem.createuser = req.cookies.user._id;

    var entity = new Problem(problem);

    entity.save(function (error) {
        if (error) {
            res.json({
                code: "error",
                msg: "提交问题失败"
            })
        } else {
            res.json({
                code: "success",
                msg: "提交问题成功"
            })
        }
    });
});
router.get("/answer/:id", function (req, res) {
    Problem.findOne({_id: req.params.id})
        .populate('createuser')
        .exec(function (err, data) {
            if (err) {
                res.json({
                    code: "error",
                    msg: "数据库错误"
                });
            } else {
                data.createuser.img = "../" + data.createuser.img;
                res.render("answer", {
                    problem: data,
                    id: req.params.id
                })
            }
        })

});


router.post("/saveanswer", function (req, res) {
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


module.exports = router;