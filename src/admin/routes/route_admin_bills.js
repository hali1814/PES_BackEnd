var express = require('express');
var router = express.Router();
const billController = require('../controllers/admin_billController')



/* GET home page. */
router.get('/bills/all', require('../middlewares/authorization'), billController.getAllBills)/* GET home page. */


router.get('/bills/pending', require('../middlewares/authorization'), billController.getAllPendingBills)


router.get('/bill/details/:id', require('../middlewares/authorization'), billController.pageBillDetails)



module.exports = router;
