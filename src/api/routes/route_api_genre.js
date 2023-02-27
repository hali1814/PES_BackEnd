var express = require('express');
var router = express.Router();
///////////////////////Controller
let genreController = require('../controllers/genreController')

//GET /api/products/all
router.get('/genres/all', require('../middlewares/authorization') , genreController.getAll);



module.exports = router;
