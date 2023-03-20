var express = require('express');
var router = express.Router();
const clientController = require('../controllers/admin_clientController')



/* GET home page. */
router.get('/clients/all', require('../middlewares/authorization'), clientController.getAllClients)/* GET home page. */




module.exports = router;
