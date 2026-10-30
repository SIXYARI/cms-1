const db = require('./db');

const rows = db.prepare("SELECT * FROM posts").all();
console.table(rows);