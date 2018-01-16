var sqlite3 = require('sqlite3').verbose();
var confing = require('../config');
var constant = require('../model/constant');

exports.addTask = function(taskName, dueDate, listType, username) {
  var db = new sqlite3.Database(confing.dbPath);
  db.run("INSERT INTO TASKLIST (task_name,due_date,list_type,username)values (?,?,?,?)", [taskName, dueDate, listType, username]);
  db.close();
  return constant.success;
}
exports.searchTask = function(taskName, listType, username, cb) {
  var db = new sqlite3.Database(confing.dbPath);
  db.serialize(function() {
    db.all("SELECT * FROM TASKLIST WHERE username = ? and task_name = ? and list_type = ? ", [username, taskName, listType], function(err, allRows) {
      if (err != null) {
        console.log(err);
        cb(err);
      }
      cb(allRows);
      db.close();
    });
  });
}
exports.getAllTask = function(username, cb) {
  var db = new sqlite3.Database(confing.dbPath);
  db.serialize(function() {
    db.all("SELECT * FROM TASKLIST WHERE username = ?", username, function(err, allRows) {
      if (err != null) {
        console.log(err);
        cb(err);
      }
      cb(allRows);
      db.close();
    });
  });
}
