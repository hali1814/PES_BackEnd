var express = require('express');
var router = express.Router();
///////////////////////Controller
let storeController = require('../controllers/storeController')

//GET /api/cart
router.get('/store/:idStore/genre/:idGenre', require('../middlewares/authorization') , storeController.getProducts);

//GET /api/cart
router.get('/store/:_id', require('../middlewares/authorization') , storeController.getStoreAndItsProduct);






module.exports = router;
