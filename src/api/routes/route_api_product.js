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

//GET /api/product/:id
router.get('/product/:idProduct', require('../middlewares/authorization') , productController.getProductById);


////PES STORE
router.post('/pes_store/product/add', require('../middlewares/pestore_authorization') , productController.addProduct);
router.post('/pes_store/product/stock/add', require('../middlewares/pestore_authorization') , productController.addStock);

//GET /api/product/:id
router.get('/pes_store/product/:idProduct', require('../middlewares/pestore_authorization') , productController.getProductById);

module.exports = router;
