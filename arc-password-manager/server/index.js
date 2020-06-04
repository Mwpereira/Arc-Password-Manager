const express = require("express"); //Express Framework
const bodyParser = require("body-parser"); //Middleware - Receives requests
const cors = require("cors"); //Middleware

const app = express(); //Creates app

require("dotenv").config(); //Essential for private environment variables

// Middleware
app.use(bodyParser.json());
app.use(cors());

const signup = require("./routes/signup.js");
const login = require("./routes/login.js");

const post = require("./routes/post.js");

app.use("/signup", signup);
app.use("/login", login);

const port = 8000; //Server port

app.listen(port, () => console.log("Server started and listening on port 8000...")); //Server display message

//Middleware for JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401).send();
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
