var express = require('express');
var router = express.Router();
///////////////////////Controller
let storeController = require('../controllers/storeController')

//GET /api/cart
router.get('/store/:idStore/genre/:idGenre', require('../middlewares/authorization') , storeController.getProducts);


//GET /api/cart
router.get('/store/:_id', require('../middlewares/authorization') , storeController.getStoreAndItsProduct);



//PES STORE
router.post('/pes_store/login', storeController.loginStore);
router.post('/pes_store/register', storeController.registerStore);
router.get('/pes_store/get', require('../middlewares/pestore_authorization') , storeController.pes_getStoreAndItsProduct);



module.exports = router;
