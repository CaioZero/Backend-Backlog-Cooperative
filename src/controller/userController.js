var express = require('express');
var router = express.Router();
var pool = require(`../database/db_connection`)


/* GET users listing. */
router.route('/')
   .get((req, res, next) => {
      console.log('TESTE')
      pool.query('Select * from public.users')
         .then((users) => {
            res.statusCode = 200
            res.setHeader('Content-type', 'application/json')
            res.json(users.rows)
         }, (err) => next(err))
         .catch((err) => next(err))

   })
   .put((req, res, next) => {
      /**403 is a code for forbidden method http */
      res.statusCode = 403;
      res.end(`PUT operation not supported on /Users`)
   })
   .post((req, res, next) => {
      var {
         name
      } = req.body /**Need to put the variable into keys to recongize value */
      if(name){
         pool.query(`INSERT INTO public.users(name) VALUES ('${name}')`)
         .then((user) => {
            res.statusCode = 200
            //    res.setHeader('Content-type','application/json')
            res.send(`User ${user.rows} added`)
         }, (err) => next(err))
         .catch((err) => next(err))
      }
      else res.send('Name field is empty')
      
   })
   .delete((req, res, next) => {
      /**Deleting all users*/
      pool.query(`DELETE FROM public.users`)
         .then((resp) => {
            res.statusCode = 200 /**Inform a http request that it`s all ok */
            res.setHeader(`Content-type`, `application/json`) /**The type of the object */
            res.json(resp) /**Returning into Json */
         }, (err) => next(err))
         .catch((err) => next(err))
   })

router.route('/:userId')
   .get((req, res, next) => {
      console.log('userROuter')
      console.log(req.params.userId)
      pool.query(`SELECT * from public.users WHERE user_id=${req.params.userId}`)
         .then((users) => {
            res.statusCode = 200
            res.setHeader('Content-type', 'application/json')
            res.json(users.rows)
         }, (err) => next(err))
         .catch((err) => next(err))
   })
   .post((req, res, next) => {
      /**403 is a code for forbidden method http */
      res.statusCode = 403;
      res.end(`PUT operation not supported on /Users`)
   })
   /**Changing user name */
   .put((req, res, next) => {
      const {
         name
      } = req.body
      console.log(name, req.params.userId)
      pool.query(`UPDATE public.users SET name='${name}' WHERE user_id ='${req.params.userId}' `)
         .then((user) => {
            res.statusCode = 200
            res.setHeader('Content-type', 'application/json')
            res.json(user.rows)
         }, (err) => next(err))
         .catch((err) => next(err))
   })
   /**Deleting a single user */
   .delete((req, res, next) => {
      const {
         name
      } = req.body
      console.log(name, req.params.userId)
      pool.query(`Delete from public.users where user_id='${req.params.userId}'`)
         .then((user) => {
            res.statusCode = 200
            res.end(`User "${name}" deleted`)
         }, (err) => next(err))
         .catch((err) => next(err))
   })

module.exports = router