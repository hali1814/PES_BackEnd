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
var notificationRouter = require('./route_api_notification')
var rateRouter = require('./route_api_rate')
var searchRouter = require('./route_api_search')

apiRouter.use(usersRouter)
apiRouter.use(productRouter)
apiRouter.use(genreRouter)
apiRouter.use(cartRouter)
apiRouter.use(upLoadRouter)
apiRouter.use(storeRouter)
apiRouter.use(invoiceRouter)
apiRouter.use(gameRouter)
apiRouter.use(notificationRouter)
apiRouter.use(rateRouter)
apiRouter.use(searchRouter)




module.exports = apiRouter
