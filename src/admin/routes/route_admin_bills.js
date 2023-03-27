var express = require('express');
var router = express.Router();
const billController = require('../controllers/admin_billController')



/* GET home page. */
router.get('/bills/all', require('../middlewares/authorization'), billController.getAllBills)/* GET home page. */


router.get('/vouchers/pes', require('../middlewares/authorization'), billController.getVouchers)


router.get('/bill/details/:id', require('../middlewares/authorization'), billController.pageBillDetails)

router.get('/bill/changeStatus/:idBill/:status', require('../middlewares/authorization'), billController.pageUpdateBill)

module.exports = router;
