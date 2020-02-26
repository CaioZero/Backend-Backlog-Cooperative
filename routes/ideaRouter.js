var express = require('express');
var router = express.Router();
var pool = require(`./db_connection`)

router.route('/')
    .get((req, res, next) => {
        pool.query('Select * from public.ideas')
            .then((users) => {
                res.statusCode = 200
                res.setHeader('Content-type', 'application/json')
                res.json(users.rows)
                res.send('user')
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .put((req, res, next) => {
        /**403 is a code for forbidden method http */
        res.statusCode = 403;
        res.end(`PUT operation not supported on /ideas`)
    })
    .post((req, res, next) => {
        const {name,category,description} = req.body /**Need to put the variable into keys to recongize value */
        if(name){
            if(category){
                if(description){
                    pool.query(`INSERT INTO public.ideas(idea_owner,category, description) 
                    VALUES ('${name}','${category}', '${description}')`)
                    .then((idea) => {
                        res.statusCode = 200
                        res.setHeader('Content-type','application/json')
                        res.send(`Idea ${idea.rows} added`)
                    }, (err) => next(err))
                    .catch((err) => next(err))
                }else res.send('Description field is empty')
            }else res.send('Category field is empty')
        }else res.send('Name field is empty')       
    })
    .delete((req, res, next) => {
        pool.query(`DELETE FROM public.ideas`)
         .then((resp) => {
            res.statusCode = 200 /**Inform a http request that it`s all ok */
            res.setHeader(`Content-type`, `application/json`) /**The type of the object */
            res.json(resp) /**Returning into Json */
         }, (err) => next(err))
         .catch((err) => next(err))
    })

router.route('/:ideaId')
.get((req, res, next) => {
    console.log('userID')
    console.log(req.params.ideaId)
    pool.query(`SELECT * from public.ideas WHERE idea_id=${req.params.ideaId}`)
       .then((users) => {
          res.statusCode = 200
          res.setHeader('Content-type', 'application/json')
          res.json(users.rows)
       }, (err) => next(err))
       .catch((err) => next(err))
 })
    /**Updating a specify Idea */
.put((req, res, next) => {
   const {description} = req.body
   pool.query(`UPDATE public.ideas SET description='${description}' WHERE idea_id='${req.params.ideaId}'`)
        .then((user) => {
            res.statusCode = 200 /**Inform a http request that it`s all ok */
            res.setHeader(`Content-type`, `application/json`) /**The type of the object */
            res.json(user) /**Returning into Json */
        }, (err) => next(err))
        .catch((err) => next(err))
})
.post((req, res, next) => {
    const {name,description} = req.body /**Need to put the variable into keys to recongize value */
    console.log(name+description)
                pool.query(`INSERT INTO public.idea_comments(
                    description, comment_owner)
                    VALUES ('${description}','${name}')`)
                .then((idea) => {
                    res.statusCode = 200
                    res.setHeader('Content-type','application/json')
                    res.send(`Idea ${idea.rows} added`)
                }, (err) => next(err))
                .catch((err) => next(err))
           
})

router.route('/:ideaId/comments')
    .get((req,res,next)=>{
        console.log(req.params)
        pool.query('SELECT comment_owner, description, comment_id, idea_id FROM public.idea_comments')
            .then((users) => {
                res.statusCode = 200
                res.setHeader('Content-type', 'application/json')
                res.json(users.rows)
                res.send('user')
            }, (err) => next(err))
            .catch((err) => next(err))
    })
 

module.exports = router