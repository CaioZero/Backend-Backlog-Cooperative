var express = require('express');
var router = express.Router();
var pool = require(`./db_connection`)


/* GET users listing. */
router.route('/')
  .get((req, res, next) => {
     pool.query('Select * from public.usuario')
      .then((users)=>{
        res.statusCode = 200
        res.setHeader('Content-type','application/json')
        res.json(users.rows)
      },(err)=>next(err))
      .catch((err)=> next(err))
    
  })
  .put((req,res,next)=>{
     /**403 is a code for forbidden method http */
     res.statusCode = 403;
     res.end(`PUT operation not supported on /Users`)
  })
  .post((req,res,next)=>{
     var {nome} = req.body /**Need to put the variable into keys to recongize value */
     pool.query(`INSERT INTO public.usuario(nome) VALUES ('${nome}')`)
     .then((user)=>{
      res.statusCode = 200
     //    res.setHeader('Content-type','application/json')
     res.send(`User ${user.rows} added`)
    },(err)=>next(err))
    .catch((err)=> next(err))
  })
  .delete(()=>{
     /**403 is a code for forbidden method http */
     res.statusCode = 403;
     res.end(`delete operation not supported on /Users`)
  })



module.exports = router;