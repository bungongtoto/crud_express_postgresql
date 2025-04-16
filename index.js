const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require('dotenv').config();
const db = require("./controllers/usersController.js");


const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get("/", (request, response) => {
    response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);

app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).send("Internal Server Error");
});

app.listen(port, () => {
    console.log(`APP is running on PORT ${port}`);
});
