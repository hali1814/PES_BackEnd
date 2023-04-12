var express = require('express');
var router = express.Router();
///////////////////////Controller
let genreController = require('../controllers/genreController')

//GET /api/products/all
router.get('/genres/all', require('../middlewares/authorization') , genreController.getAll);



router.get('/pes_store/genres/all', require('../middlewares/pestore_authorization') , genreController.getAll);





module.exports = router;
