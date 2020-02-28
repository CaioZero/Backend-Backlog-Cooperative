var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const routes = require('../routes/routes')
require('../database/db_connection')

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes)

app.listen(3000, ()=>{
  console.log('Server connected')
})

// catch 404 and forward to error handler
app.use((req, res, next) =>{
  next(createError(404));
});


module.exports = app;
