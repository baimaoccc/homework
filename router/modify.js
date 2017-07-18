var exp = require('express');
var router = exp.Router();
var multer = require('multer');
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



router.post('/modifyHeader',upload.single('userImg'),function (req, res) {
    console.log(req.file);
    if (req.file.length == 0) {
        res.json({
            code:'error',
            message:'未选取图片，请选取图片'
        });
    } else {
        res.json({
            code:'success',
            message:'上传成功'
        });

    }
});



module.exports = router;

