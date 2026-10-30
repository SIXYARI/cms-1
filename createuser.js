const bcrypt = require("bcryptjs");
const db = require("./db");

const username = process.argv[2];
const password = process.argv[3];

if (!username || !password) {
    console.log("Usage: node createuser.js <username> <password>");
    process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);

db.prepare("INSERT INTO users (username, password_hash) VALUES (?, ?").run(username, hash);

console.log("Created user: " + username);
console.log("Stored hash: " + hash);