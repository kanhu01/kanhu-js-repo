var express = require('express');
var router = express.Router();
var login = require('../model/login');
var users = require('../model/users');
var tasklist = require('../model/tasklist');
var constant = require('../model/constant');
var config = require('../config');
var auth = require('../model/auth');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  login.authenticate(req.body.username, req.body.password, function(result) {
    if (result == constant.success) {
      users.resetFailureAttempt(req.body.username);
      req.session.username = req.body.username;
      res.send({
        responseStatus: "Success"
      });
    } else if (result == constant.locked) {
      res.send({
        responseStatus: "Locked",
        responseMessage: "Your account has been locked. Please contact admin."
      });
    } else if (result == constant.reject) {
      users.updateFailureAttempt(req.body.username);
      users.updateLockStatus(req.body.username);
      res.send({
        responseStatus: "Reject",
        responseMessage: "You entered an incorrect username or password. On three failed attempts your account will be locked."
      });
    } else {
      res.send({
        responseStatus: "Error",
        responseMessage: "Something went wrong."
      });
    }
  });

});

router.get('/logout', function(req, res, next) {
  //code for invalidate session
  req.session.destroy(function(err) {
    if (err) return next(err);
  });
  res.send({
    responseStatus: "Success"
  });
});

router.post('/addTask', auth.authenticationCheck, function(req, res, next) {
  let status = tasklist.addTask(req.body.taskName, req.body.dueDate, req.body.listType, req.session.username);
  if (status == constant.success) {
    res.send({
      responseStatus: "Success",
      responseMessage: "New task added."
    });
  } else {
    res.send({
      responseStatus: "Reject",
      responseMessage: "Something went wrong."
    });
  }

});

router.post('/searchTask', auth.authenticationCheck, function(req, res, next) {
  tasklist.searchTask(req.body.taskName, req.body.listType, req.session.username, function(tasklist) {
    res.send(tasklist);
  });
});

router.get('/getAllTask', auth.authenticationCheck, function(req, res, next) {
  tasklist.getAllTask(req.session.username, function(tasklist) {
    res.send(tasklist);
  });
});
router.post('/resetPassword', function(req, res, next) {
  //This is the implementation Reset password.
  res.send({
    responseStatus: "Success",
    responseMessage: "Password reset link has been sent to your email address."
  });
});

module.exports = router;
