var express = require('express');
var apiRouter = express.Router();
/////
var productRouter = require('./route_api_product')
var usersRouter = require('./route_api_user')
var genreRouter = require('./route_api_genre')
var cartRouter = require('./route_api_bill')
var upLoadRouter = require('./route_api_upLoadImages')

apiRouter.use(usersRouter)
apiRouter.use(productRouter)
apiRouter.use(genreRouter)
apiRouter.use(cartRouter)
apiRouter.use(upLoadRouter)




module.exports = apiRouter
