

var home = require('./route_admin_dashboard');
var login = require('./route_admin_login')




const connectAdminRouter= (app) => {
    
    app.use("/admin", login)
   
}
module.exports = connectAdminRouter;