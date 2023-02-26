var express = require('express');
var apiRouter = express.Router();
/////
var productRouter = require('./route_api_product')
var usersRouter = require('./route_api_user')

apiRouter.use(usersRouter)
apiRouter.use(productRouter)




module.exports = apiRouter
