var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/TLM.db');
var bcrypt = require('bcrypt');

db.serialize(function() {
  db.run("CREATE TABLE if not exists user_info (username TEXT, password TEXT, failure_attempt INTEGER,account_status TEXT )");
  db.run("DELETE FROM USER_INFO WHERE username = ?", "admin");
  var stmt = db.prepare("INSERT INTO user_info (username, failure_attempt, account_status) VALUES (?,?,?)");
  stmt.run("admin", 0, "ACTIVE");
  stmt.finalize();
  bcrypt.hash('Password123', 10, function(err, hash) {
    db.run("UPDATE USER_INFO SET password=?  WHERE username = ?", hash, "admin");
  });
  db.run("CREATE TABLE if not exists tasklist (task_id INTEGER PRIMARY KEY AUTOINCREMENT, task_name TEXT, " +
    "due_date TEXT,list_type TEXT, username TEXT )");

  db.each("SELECT * FROM user_info", function(err, row) {
    console.log(row.username + ": " + row.password);
  });
  db.each("SELECT * FROM tasklist", function(err, row) {
    console.log(row.username + ": " + row.task_id + ": " + row.task_name + ": " + row.due_date + ": " + row.list_type);
  });
});
