var express = require('express');
var router = express.Router();
var pool = require(`./db_connection`)

/* GET home page. */
router.route('/')
  .get((req, res, next) => {
     res.send('Welcome to index page');
   // res.render('pages/home')
  });

module.exports = router;