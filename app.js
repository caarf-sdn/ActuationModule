
var createError = require('http-errors');       //NodeModule
var express = require('express');               //NodeModule
var path = require('path');                     //NodeModule
var cookieParser = require('cookie-parser');    //NodeModule
var logger = require('morgan');                 //NodeModule


var indexRouter = require('./routes/index');
var exampleRouter = require('./routes/example');
var ControllerRouter = require('./routes/Atcontroller');
var OptimizationRouter = require('./routes/Optimization');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.set('dbUrl', 'mongodb://localhost:27017/');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/example', exampleRouter);
app.use('/controller', ControllerRouter);
app.use('/Optimization', OptimizationRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

require('./Init.js').init(false, "sdn", "skyline").then(function() {
    
}).catch(function() {

    
    
});

// var mid = require('./midAuth');
// app.use(function(err, req, res, next) {

//     mid.obterToken(true).then(function(items)
//     { 
//         res.send(items); 
//         console.log(items); 
//     }).catch(function() 
//                         { 
//                             console.log('erro') 
//                         })

//     setInterval(mid.obterToken(true).then(function(items)
//     { 
//         res.send(items); 
//         console.log(items); 
//     }).catch(function() 
//                         { 
//                             console.log('erro') 
//                         }),60000);                                           
// });    




module.exports = app;