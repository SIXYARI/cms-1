const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Hello from my server!</h1>");
});

app.get("/about", (req, res) => {
    res.send("<h1>About the web design club</h1>");
});

app.get("/contact", (req, res) => {
    res.send("<h1>Contacts:</h1> <p>Name Lastname, Number, Email@email.com</p>");
})

app.listen(PORT, () => {
    console.log('Server running at http://localhost' + PORT)
});
