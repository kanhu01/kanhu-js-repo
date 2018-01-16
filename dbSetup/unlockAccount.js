var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/TLM.db');
db.serialize(function() {
  db.run("UPDATE USER_INFO SET failure_attempt = 0,account_status = 'ACTIVE'  WHERE username = ?", "admin");
  db.each("SELECT * FROM USER_INFO", function(err, row) {
      console.log(row.account_status + ": " + row.password);
  });
});
