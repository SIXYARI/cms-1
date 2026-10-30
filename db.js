const { DatabaseSync } = require("node:sqlite");
const db = new DatabaseSync("cms.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
`)

module.exports = db;