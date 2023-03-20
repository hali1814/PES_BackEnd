var express = require('express');
var router = express.Router();
const dashboardController = require('../controllers/admin_dashboardController')

/* GET home page. */
router.get('/dashboard', require('../middlewares/authorization') ,dashboardController.pageDashBoard);

module.exports = router;
