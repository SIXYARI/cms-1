const express = require("express");
const db = require("./db");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    const posts = db.prepare("SELECT * FROM posts ORDER BY id DESC").all();
    res.render('index', { posts });
});

app.listen(PORT, () => {
    console.log('Server running at http://localhost' + PORT)
});

app.get("/post/:id", (req, res) => {
    const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(req.params.id);
    if (!post) {
        return res.status(404).send("Post not found");
    }
    res.render("post", { post });
});