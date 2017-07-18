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
})

module.exports = router;