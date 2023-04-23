var express = require('express');
var router = express.Router();
///////////////////////Controller
let searchController = require('../controllers/searchController')

router.post('/search/suggest', require('../middlewares/authorization') , searchController.suggest);
router.post('/search/action', require('../middlewares/authorization') , searchController.search);


module.exports = router;
