var express = require('express');
var adminRoute = express.Router();
/////
const routeUser = require('./route_admin_login')
const routeDashboard = require('./route_admin_dashboard')
const routeProduct = require('./route_admin_products')
const routeBill = require('./route_admin_bills')
const routeStore = require('./route_admin_store')
const routeClient = require('./route_admin_client')


adminRoute.use(routeUser)
adminRoute.use(routeDashboard)
adminRoute.use(routeProduct)
adminRoute.use(routeBill)
adminRoute.use(routeStore)
adminRoute.use(routeClient)





module.exports = adminRoute
