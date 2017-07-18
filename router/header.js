var exp = require('express');
var router = exp.Router();

router.get('/logout',function (req, res) {
    res.clearCookie('user');
    res.redirect('/login');
});




module.exports = router;