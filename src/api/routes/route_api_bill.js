var express = require('express');
var router = express.Router();
///////////////////////Controller
let billController = require('../controllers/billController')

//GET /api/cart
router.get('/cart', require('../middlewares/authorization') , billController.getCart);

//POST /api/cart
router.post('/cart/add', require('../middlewares/authorization') , billController.addCart);



module.exports = router;
