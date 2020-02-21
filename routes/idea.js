var express = require('express');
var router = express.Router();
var pool = require(`./db_connection`)

router.route('/')
    .get((req, res, next) => {
        pool.query('Select * from public.ideia')
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
        const {
            likes,
            dislikes,
            visualizacoes,
            categoria,
            descricao,
            nomeUsuario
        } = req.body /**Need to put the variable into keys to recongize value */
        pool.query(`INSERT INTO public.ideia(likes, dislikes, visualizacoes, categoria, descricao, "nomeUsuario")
                 VALUES ('${likes}', '${dislikes}',' ${visualizacoes}', '${categoria}', '${descricao}','"${nomeUsuario}"'`)
            .then((idea) => {
                res.statusCode = 200
                res.setHeader('Content-type','application/json')
                res.send(`Idea ${idea.rows} added`)
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .delete((req, res, next) => {
        /**403 is a code for forbidden method http */
        res.statusCode = 403;
        res.end(`delete operation not supported on /ideas`)
    })

router.route('/:ideiaid')
.put((req, res, next) => {
    const {categoria,descricao,nomeUsuario} = req.body
    /**Updating a specify Idea */
   pool.query(`UPDATE public.ideia
   SET categoria=${categoria}, descricao=${descricao}
   WHERE "nomeUsuario" = '${nomeUsuario}'`)
        .then((user) => {
            res.statusCode = 200 /**Inform a http request that it`s all ok */
            res.setHeader(`Content-type`, `application/json`) /**The type of the object */
            res.json(user) /**Returning into Json */
        }, (err) => next(err))
        .catch((err) => next(err))
})
module.exports = router