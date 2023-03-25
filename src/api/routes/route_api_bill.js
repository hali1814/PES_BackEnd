var express = require('express');
var router = express.Router();
///////////////////////Controller
let billController = require('../controllers/billController')

//GET /api/cart
router.get('/cart', require('../middlewares/authorization') , billController.getCart);



//GET /api/cart/delete/product
router.post('/cart/delete/product', require('../middlewares/authorization') , billController.deleteProduct);

//GET /api/cart/delete/product
router.post('/cart/decline/product', require('../middlewares/authorization') , billController.declineProduct);

//POST /api/cart
router.post('/cart/add', require('../middlewares/authorization') , billController.addCart);


router.get('/cart/count', require('../middlewares/authorization') , billController.countCart);


router.post('/haohoa', require('../middlewares/authorization') , billController.test);




module.exports = router;
