const express = require('express')

var indexController = require('../controller/indexController');
var usersController = require('../controller/userController');
var ideaController = require('../controller/ideaController')
const routes = express.Router()

routes.use('/',indexController)
routes.use('/users',usersController)
routes.use('/topic',ideaController)

module.exports = routes