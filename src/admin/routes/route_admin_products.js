var express = require('express');
var router = express.Router();
const admin_productController = require('../controllers/admin_productsController')



/* GET home page. */
router.get('/products/all', require('../middlewares/authorization'), admin_productController.getAllProducts)/* GET home page. */


router.get('/products/pending', require('../middlewares/authorization'), admin_productController.getAllPendingProducts)


router.get('/product/detail', require('../middlewares/authorization'), admin_productController.pageProductDetail)

module.exports = router;
