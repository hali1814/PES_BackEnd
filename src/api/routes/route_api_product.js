var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/products/all', require('../middlewares/authorization') ,function(req, res, next) {
  // console.log(res.locals.haohoa)
  res.send('haodep trai')
});



module.exports = router;
