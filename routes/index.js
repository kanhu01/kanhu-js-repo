var express = require('express');
var router = express.Router();
var auth = require('../model/auth');

router.get('/login.html', function(req, res, next) {
  res.render('../views/index.html');
});
/* GET home page. */
router.get('/', auth.authenticationCheck, function(req, res, next) {
  res.render('../views/dashboard.html');
});


router.get('/dashboard.html', auth.authenticationCheck, function(req, res, next) {
  res.render('../views/dashboard.html');

});
router.get('/addTask.html', auth.authenticationCheck, function(req, res, next) {
  res.render('../views/addTask.html');
});

router.get('/searchTask.html', auth.authenticationCheck, function(req, res, next) {
  res.render('../views/searchTask.html');
});

router.get('/resetPassword.html', function(req, res, next) {
  res.render('../views/resetPassword.html');
});
module.exports = router;
