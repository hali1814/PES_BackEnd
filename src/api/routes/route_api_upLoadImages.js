var express = require('express');
var router = express.Router();
const upload = require('../middlewares/upLoadImageMiddleware');
///////////////////////Controller
let upLoadController = require('../controllers/upLoadImagesController')

//GET /api/upLoadOne
router.post('/upLoadOne', [require('../middlewares/authorization'), upload.single('image')] , upLoadController.upLoadOne);





module.exports = router;
