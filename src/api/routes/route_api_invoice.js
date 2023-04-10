var express = require('express');
var router = express.Router();
///////////////////////Controller
let invoiceController = require('../controllers/invoiceController')

//GET /api/products/all
router.get('/bills/:status', require('../middlewares/authorization') , invoiceController.getBillsByStatus);


//GET /api/products/all
router.post('/bill/calculator', require('../middlewares/authorization') , invoiceController.calculatorBill);


//GET /api/products/all
router.post('/bill/add', require('../middlewares/authorization') , invoiceController.addBillFromCart);

router.get('/bill/:id', require('../middlewares/authorization') , invoiceController.getBillDetails);

router.post('/bill/status/cancel', require('../middlewares/authorization') , invoiceController.cancelStatusBill);



//shop PES
router.post('/pes_store/bill/status/topPayToShip', require('../middlewares/pestore_authorization') , invoiceController.topPayToShip);

router.post('/pes_store/bill/status/toShipToReceive', require('../middlewares/pestore_authorization') , invoiceController.toShipToReceive);

router.post('/pes_store/bill/status/toReceiveToCompleted', require('../middlewares/pestore_authorization') , invoiceController.toReceiveToCompleted);


router.post('/pes_store/bill/status/cancel', require('../middlewares/pestore_authorization') , invoiceController.cancelStatusBillByStore);


module.exports = router;
