console.log("Node version: " + process.version);

require("express");
console.log("express...         [ok]");

require("ejs");
console.log("ejs...             [ok]");

require("express-session");
console.log("express-session... [ok]");

require("bcryptjs");
console.log("bcryptjs...        [ok]");

const { DatabaseSync } = require("node:sqlite");
const testDb = new DatabaseSync(":memory:");
testDb.exec("CREATE TABLE test (id INTEGER)");
console.log("sqlite...          [ok]");

console.log("stack...         loaded");