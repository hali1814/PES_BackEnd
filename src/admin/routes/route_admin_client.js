var express = require('express');
var router = express.Router();
const clientController = require('../controllers/admin_clientController')



/* GET home page. */
router.get('/clients/all', require('../middlewares/authorization'), clientController.getAllClients)/* GET home page. */
router.get('/client/details/:id', require('../middlewares/authorization'), clientController.pageDetails)/* GET home page. */


router.get('/client/:id/changeStatus/:status', require('../middlewares/authorization'), clientController.pageUpdateUser)


module.exports = router;
