var exp = require('express');
var bodyParser = require('body-parser');
var app = exp();

app.use(exp.static('views'));
app.use(bodyParser.urlencoded({extended:true}));



app.listen(8080,function () {
    console.log('server on 8080...');
});