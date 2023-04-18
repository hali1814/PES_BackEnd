var express = require('express');
var router = express.Router();
///////////////////////Controller
let rateController = require('../controllers/rateController')
//0: unRate
//1: rated
//GET /api/products/all
router.get('/rates/0', require('../middlewares/authorization') , rateController.getRate0);
router.post('/rates/update', require('../middlewares/authorization') , rateController.updateRate);


module.exports = router;
