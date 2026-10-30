const db = require('./db');

const posts = [
    ["Welcome to the club blog", "This is the very first post on your brand new cms."],
    ["Meeting times", "We meet every tuesday after school in room 114."],
    ["Spring project idead", "Vote for your favorite project idea at the next meeting"]
];

db.exec("DELETE FROM posts")
const insert = db.prepare("INSERT INTO posts (title, body) VALUES (?, ?)");

for (const [title, body] of posts) {
    insert.run(title, body);
};

console.log("Added " + posts.length + " posts");