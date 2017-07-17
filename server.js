var exp = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const template = require('art-template')

var app = exp();
require('./db');

app.use(exp.static('views'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.engine('html',template.__express );
app.set('view engine', 'html');




app.use(require('./router/login'));
app.use(require('./router/register'));
app.use(require('./router/header'));


// app.use(require('./router/login').router);


app.listen(8080,function () {
    console.log('server on 8080...');
});