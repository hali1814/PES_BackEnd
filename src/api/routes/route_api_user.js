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

//GET login 
router.post('/voucher/add',require('../middlewares/authorization') ,loginController.addVoucher);

//GET logout 
router.get('/logout',require('../middlewares/authorization') ,loginController.logout);


//GET /change_password
router.post('/change_password',require('../middlewares/authorization') ,loginController.changePassword);

//GET /update/profiles
router.post('/update/profiles',require('../middlewares/authorization') ,loginController.updateProfile);


//POST /register
router.post('/register' ,loginController.register);

router.post('/getTokenDevice', require('../middlewares/authorization'),loginController.getTokenDeviceFirebase);

router.get('/vouchers/all',require('../middlewares/authorization') ,loginController.getAllVoucher);


router.post('/active',loginController.active);

// /* GET register page. */
// router.get('/register', function(req, res, next) {
//   res.render('register', {layout: false});
// });


// /* GET forget page. */
// router.get('/forgot', function(req, res, next) {
//   res.render('forgotPassword', {layout: false});
// });


module.exports = router;
