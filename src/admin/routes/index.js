

var home = require('./route_admin_dashboard');
var login = require('./route_admin_login')




const connectAdminRouter= (app) => {
    
    app.use("/admin", login)
    // app.get('/', (req, res) => {
    //     res.redirect('/login')
    // })
}
module.exports = connectAdminRouter;