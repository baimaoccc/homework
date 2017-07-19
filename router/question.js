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

    //问题的提出者存放一个MyUser表记录的_id字段，
    // 该字段是Mongodb数据库自动设置的id字段，在注册时不需要设置该字段
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
    });
});







module.exports = router;