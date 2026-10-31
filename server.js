const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const db = require("./db");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: "change-this-secret",
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

function requireLogin(req, res, next) {
    if(!req.session.user) {
        return res.redirect("/login");
    }
    next();
};

app.get("/", (req, res) => {
    const posts = db.prepare("SELECT * FROM posts ORDER BY id DESC").all();
    res.render('index', { posts });
});

app.get("/login", (req, res) => {
    res.render("login", { error: null });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);

    if(user && bcrypt.compareSync(password, user.password_hash)) {
        req.session.user = { id: user.id, username: user.username };
        return res.redirect("/admin");
    };

    res.render("login", { error: "Wrong username or password." })
});

app.get("/admin", requireLogin, (req, res) => {
    const posts = db.prepare("SELECT * FROM posts ORDER BY id DESC").all();
    res.render("dashboard", { posts })
});

app.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

app.get("/admin/new", requireLogin, (req, res) => {
    res.render("edit", { post: null });
});

app.post("/admin/new", requireLogin, (req, res) => {
    const { title, body } = req.body;
    db.prepare("INSERT INTO posts (title, body) VALUES (?, ?)").run(title, body);
    res.redirect("/admin");
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