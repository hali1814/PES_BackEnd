var express = require('express');
var router = express.Router();
const controller = require('../controllers/admin_loginController')




router.post('/haohoa/login', controller.checkLogin);

/* GET login page. */
router.get('/', controller.pageLogin);


module.exports = router;
