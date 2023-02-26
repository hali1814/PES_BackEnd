var express = require('express');
var router = express.Router();
var userSchema = require('../../utils/models/user')
///////controller 
var loginController = require('../controllers/loginController')


/* GET login page. */
router.post('/login', loginController.login);

// /* GET register page. */
// router.get('/register', function(req, res, next) {
//   res.render('register', {layout: false});
// });


// /* GET forget page. */
// router.get('/forgot', function(req, res, next) {
//   res.render('forgotPassword', {layout: false});
// });


module.exports = router;
