var express = require('express');
var router = express.Router();
const storeController = require('../controllers/admin_stroreController')



/* GET home page. */
router.get('/stores/all', require('../middlewares/authorization'), storeController.getAllStores)/* GET home page. */




module.exports = router;
