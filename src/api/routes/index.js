var express = require('express');
var apiRouter = express.Router();
/////
var productRouter = require('./route_api_product')
var usersRouter = require('./route_api_user')
var genreRouter = require('./route_api_genre')

apiRouter.use(usersRouter)
apiRouter.use(productRouter)
apiRouter.use(genreRouter)




module.exports = apiRouter
