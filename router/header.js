var exp = require('express');
var router = exp.Router();

router.get('/logout',function (req, res) {
    res.clearCookie('user');
    res.redirect('/login');
});

router.get('/question',function (req, res) {
    res.render('question');
});



module.exports = router;