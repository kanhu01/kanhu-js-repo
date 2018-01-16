var users = require('../model/users');
var constant = require('../model/constant');
var bcrypt = require('bcrypt');
exports.authenticate = function(username, password, cb) {
  users.getUserInfo(username, function(userInfo) {
    if (userInfo && userInfo.username == username && userInfo.account_status == "ACTIVE") {
      bcrypt.compare(password, userInfo.password, function(err, res) {
        if (res) {
          return cb(constant.success);
        } else {
          return cb(constant.reject);
        }
      });
    } else if (userInfo && userInfo.account_status == "LOCKED") {
      return cb(constant.locked);
    } else {
      return cb(constant.reject);
    }
  });

}
