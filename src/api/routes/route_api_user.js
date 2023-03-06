var express = require('express');
var router = express.Router();
var userSchema = require('../../utils/models/user')
///////controller 
var loginController = require('../controllers/loginController')


//POST login 
router.post('/login', loginController.login);

//GET login 
router.get('/profiles',require('../middlewares/authorization') ,loginController.getProfiles);

//GET login 
router.get('/vouchers',require('../middlewares/authorization') ,loginController.getVouchers);

//GET logout 
router.get('/logout',require('../middlewares/authorization') ,loginController.logout);



//GET /change_password
router.post('/change_password',require('../middlewares/authorization') ,loginController.changePassword);

// /* GET register page. */
// router.get('/register', function(req, res, next) {
//   res.render('register', {layout: false});
// });


// /* GET forget page. */
// router.get('/forgot', function(req, res, next) {
//   res.render('forgotPassword', {layout: false});
// });


module.exports = router;
