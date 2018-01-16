var sqlite3 = require('sqlite3').verbose();
var config = require('../config');
exports.getUserInfo = function(username, cb) {
  var db = new sqlite3.Database(config.dbPath);
  db.get("SELECT username,password,failure_attempt, account_status FROM USER_INFO WHERE username = ?", username, function(err, row) {
    if (err) {
      console.log(err);
      return cb({});
    }
    return cb(row);
  });
  db.close();
}
exports.updateFailureAttempt = function(username) {
  var db = new sqlite3.Database(config.dbPath);
  db.run("UPDATE USER_INFO SET failure_attempt = failure_attempt + 1 WHERE username = ?", username);
  db.close();
}
exports.updateLockStatus = function(username) {
  exports.getUserInfo(username, function(userInfo) {
    if (userInfo && userInfo.failure_attempt >= confing.failureAttempt) {
      var db = new sqlite3.Database(config.dbPath);
      db.run("UPDATE USER_INFO SET failure_attempt = 0, account_status = 'LOCKED'  WHERE username = ?", username);
      db.close();
    }
  });
}
exports.resetFailureAttempt = function(username) {
  var db = new sqlite3.Database(config.dbPath);
  db.run("UPDATE USER_INFO SET failure_attempt = 0 WHERE username = ?", username);
  db.close();
}
exports.lockAccount = function(username) {
  var db = new sqlite3.Database(config.dbPath);
  db.run("UPDATE USER_INFO SET account_status = 'LOCKED'  WHERE username = ?", username);
  db.close();
}
