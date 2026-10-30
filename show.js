const db = require('./db');

const rows = db.prepare("SELECT * FROM users").all();
console.table(rows);