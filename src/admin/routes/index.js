var express = require('express');
var adminRoute = express.Router();
/////
const routeUser = require('./route_admin_login')
const routeDashboard = require('./route_admin_dashboard')
adminRoute.use(routeUser)
adminRoute.use(routeDashboard)





module.exports = adminRoute
