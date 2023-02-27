var express = require('express');
var router = express.Router();
///////////////////////Controller
let productController = require('../controllers/productController')

//GET /api/products/all
router.get('/products/all', require('../middlewares/authorization') , productController.getAll);

//GET /api/products/genre/:id
router.get('/products/genre/:idGenre', require('../middlewares/authorization') , productController.getProductsByGenre);

//GET /api/products/flash_Sale
router.get('/products/flash_sale', require('../middlewares/authorization') , productController.getFlashSale);



module.exports = router;
