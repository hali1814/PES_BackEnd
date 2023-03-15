var express = require('express');
var apiRouter = express.Router();
/////
var productRouter = require('./route_api_product')
var usersRouter = require('./route_api_user')
var genreRouter = require('./route_api_genre')
var cartRouter = require('./route_api_bill')
var upLoadRouter = require('./route_api_upLoadImages')
var storeRouter = require('./route_api_store')
var invoiceRouter = require('./route_api_invoice')
var gameRouter = require('./route_api_game')

apiRouter.use(usersRouter)
apiRouter.use(productRouter)
apiRouter.use(genreRouter)
apiRouter.use(cartRouter)
apiRouter.use(upLoadRouter)
apiRouter.use(storeRouter)
apiRouter.use(invoiceRouter)
apiRouter.use(gameRouter)




module.exports = apiRouter
