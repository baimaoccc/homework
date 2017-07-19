var exp = require('express');
var router = exp.Router();
var multer = require('multer');
var MyUser = require('../db').MyUser;

var storage = multer.diskStorage({
    //目标路径（存储位置）
    destination: './views/img',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

//multer：接收多种类型的数据
//storage这个对象来接收数据
var upload = multer({storage: storage});


router.post('/modifyHeader', upload.single('userImg'), function (req, res) {

    if (!req.file) {
        res.json({
            code: 'error',
            message: '未选取图片，请选取图片'
        });
    } else {

        //从本地读取文件
        var userId = req.cookies.user._id;
        var imgPath = req.file.path.substr(6);
        MyUser.update({_id: userId}, {$set: {img: imgPath}}, function (err) {
            if (err) {
                res.json({
                    code: 'error',
                    message: '更新数据库头像失败'
                })
            } else {
                res.json({
                    code: 'success',
                    message: '更新头像成功'
                });
            }
        });
    }
});


module.exports = router;

