/**
 * Created by apple on 17/7/18.
 */
var util = require("../util");
const express = require("express");
var Problem = require("../db").Problem;


var router = express.Router();


/*
 title: String,
 time:String,
 ip:String,
 createuser:Object,
 answers:[Object]
 */
router.post("/api/saveproblem",function(req,res){
    var title = req.body.title;
    var problem = {};
    problem.title = title;
    problem.time = util.getCurTime();
    problem.ip = util.changeIp(req.ip);
    problem.createuser = req.cookies.user;
    problem.answers = [];
    var entity = new Problem(problem);
    entity.save(function(error){
        if(error){
            res.json({
                code:"error",
                msg:"提交问题失败"
            })
        }else{
            res.json({
                code:"success",
                msg:"提交问题成功"
            })
        }
    })
})
router.get("/answer/:id",function(req,res){
    console.log(req.params.id);
    Problem.findById(req.params.id,function(err,data){
        if (err) {
            res.json({
                code:"error",
                msg:"数据库错误"
            });
        } else {
            var problem = data.toObject()
            problem.id = data._id;
            delete data._id;
            res.render("answer",{
                problem:problem
            })
        }
    })
})
router.post("/saveanswer",function(req,res){
    var answertilte = req.body.title;
    var answer = {}
    answer.account = req.cookies.user.account;
    answer.title = answertilte;
    answer.time = util.getCurTime();
    answer.ip = util.changeIp(req.ip);

    Problem.findById(req.body.problemid,function(err,data){
        if (err) {
            res.json({
                code:"error",
                msg:"数据库错误"
            });
        } else {
            var problem = data.toObject()
            problem.answers.push(answer);

            problem.update(function(err){
                if(err){
                    res.json({
                        code:"error",
                        msg:"回答问题失败"
                    })
                }else{
                    res.json({
                        code:"success",
                        msg:"回答问题成功"
                    })
                }
            })
        }
    })
})

module.exports = router;