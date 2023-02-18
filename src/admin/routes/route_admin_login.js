var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', {layout: false});
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register', {layout: false});
});


/* GET forget page. */
router.get('/forgot', function(req, res, next) {
  res.render('forgotPassword', {layout: false});
});


module.exports = router;
