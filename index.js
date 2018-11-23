const jwt = require("jsonwebtoken");
const cors = require("cors");
const expressjwt = require("express-jwt");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());
const PORT = 8888;
const jwtCheck = expressjwt({    
  secret: "mykey"
});

const users = [
  {id: 1, username: "clarkKent", password: "superman"},
  {id: 2, username: "bruceWayne", password: "batman"}
];

app.get('/time', (req, res) => {
  const time = (new Date()).toLocaleTimeString();
  res.status(200).send(`The Time is ${time}`);
});

app.post("/login", (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send("Error. Please enter the correct username and password");
    }
    const user = users.find((u) => {
        return u.username === req.body.username && u.password === req.body.password;
    });
    const token = jwt.sign({
        sub: user.id,
        username: user.username
    }, "mykey", {expiresIn: "3 hours"});
    res.status(200).send({access_token: token})
});

app.get("/asset", (req, res) => {
  res.status(200).send("Everybody can see this");
});

app.get("/asset/secret", jwtCheck, (req, res) => {
  res.status(200).send("Only logged in people can see me");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`); 
});