var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var UserRouter = require('./routes/admin/UserRouter.js');
var NewsRouter = require('./routes/admin/NewsRouter.js');
var ProductRouter = require('./routes/admin/ProductRouter')
var WebNewsRouter = require('./routes/web//NewsRouter.js')
var WebProductRouter = require('./routes/web/ProductRouter')
const jwt = require('./util/JWT');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 添加token统一处理
app.use((req, res, next) => {
  // 如果为login登录页面直接放行,初次登录无token值
  if (req.url === '/adminapi/user/login') {
    next()
    return
  }
  // 如果存在token需要进行判断处理
  // 取出token
  const token = req.headers['authorization']?.split(' ')[1]
  if (token) {
    // 存在token，进行解密验证
    const payload = jwt.verify(token)
    if (payload) {
      // 再次进行加密传递给前端，存放新的token和时效
      const newToken = jwt.sign({
        _id: payload._id,
        username: payload.username
      }, '1d')
      // 将新token发送给前端，被拦截器拦截保存新token
      res.header('Authorization', newToken)
      next()
    } else {
      res.status(401).send({ errorInfo: 'token失效' })
    }
  } else {
    next()
  }
})


app.use('/', indexRouter);
app.use('/users', usersRouter);

// adminapi处理
app.use(UserRouter)
app.use(NewsRouter)
app.use(ProductRouter)
// webapi处理
app.use(WebNewsRouter)
app.use(WebProductRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
