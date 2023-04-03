var express = require('express');
var router = express.Router();
///////////////////////Controller
let notificationController = require('../controllers/notificationController')

//GET /api/cart
router.get('/notification/all', require('../middlewares/authorization') , notificationController.getAllNotification);

router.get('/notification', require('../middlewares/authorization') , notificationController.pushNotification);
router.get('/notification/count', require('../middlewares/authorization') , notificationController.countNotification);

router.post('/notification/saw', require('../middlewares/authorization') , notificationController.sawNotification);



module.exports = router;
