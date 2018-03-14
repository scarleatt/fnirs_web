var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var exec = require('child_process').exec; 

var index = require('./routes/index');
var upload = require('./routes/upload');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.post('/upload', function(req, res){
  var form = new formidable.IncomingForm();
  var name='default filename';
  var fileType='default filetype';
  var dstDir = path.join(__dirname, '/upload');

  form.keepExtensions = true;
  form.maxFileSize = 20 * 1024 * 1024;
  form.multiples = true;
  form.uploadDir = path.join(__dirname, '/upload');

  form.on('file', function(field, file) {
    name=file.name.replace(/ /g, ''); 
    fileType=file.type;
    fs.rename(file.path, path.join(form.uploadDir, name));
  });

  form.on('error', function(err) {
      console.log('An error has occured: \n' + err);
  });

  form.on('end', function() {
    if (fileType=='text/csv') {
      exec('python ./command/run.py '+' '+dstDir+'/'+name+' ',function(error,stdout,stderr){
          if(stdout.length = 1){
            console.log('python ./command/run.py ',name, ' finished !');
            console.log('The result is ', stdout);
            res.end(stdout);
          } 
          if(error) {
            console.info('stderr : '+stderr);
            res.end('stderr');
          }
      });  
      //res.end('success');
    } else {
      console.log('Please input correct data file');
      res.end('Please input correct data file');
    }
  });

  form.parse(req);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
