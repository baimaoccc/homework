/**
 * Created by apple on 17/7/18.
 */
var util = require("../util");
const express = require("express");
var Problem = require("../db").Problem;
var MyUser = require("../db").MyUser;


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
    problem.createuser = req.cookies.user._id;
    problem.answers = "[]";
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
    })


});


router.get("/answer/:id", function (req, res) {
    var allUser = [];
    MyUser.find({},function(err,users){
        allUser = users;
    })
    Problem.findById(req.params.id, function (err, data) {
        if (err) {
            res.json({
                code: "error",
                msg: "数据库错误"
            });
        } else {

            var problem = data.toObject();
            for(var i=0;i<allUser.length;i++) {
                if (allUser[i]._id == problem.createuser) {
                    problem.cuserimg = "../" + allUser[i].img;
                    console.log(problem.cuserimg);
                    problem.cuseraccount = allUser[i].account;
                    break;
                }
            }
            res.render("answer", {
                problem: problem,
                id: req.params.id

            })
        }
    })
});


router.post("/saveanswer", function (req, res) {
    var answertilte = req.body.title;
    var answer = {}
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
            var problem = data.toObject()
            var obj = JSON.parse(problem.answers);
            obj.push(answer);
            problem.answers = JSON.stringify(obj);
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
            })

        }
    })
})

module.exports = router;