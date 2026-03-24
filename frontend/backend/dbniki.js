const mysql = require("mysql");

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Root@1234",
    database:"trainbooking"
});

db.connect(err=>{
    if(err) console.log(err);
    else console.log("✅ DB Connected");
});

module.exports = db;