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


module.exports = router;
