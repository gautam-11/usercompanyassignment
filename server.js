const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const bcrypt = require("bcrypt-nodejs");

const knex = require("knex");

const Login = require("./controllers/Login");

const Profile = require("./controllers/Profile");

const Company = require("./controllers/Company");

const ActiveUsers = require("./controllers/ActiveUsers");
//const io = require('socket.io');

const db = knex({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "23571113",
    database: "user_company"
  }
});

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json("Success");
});

app.post("/api/users/login", (req, res) => {
  Login.handleLogin(req, res, db, bcrypt);
});

app.get("/api/users/profile/:id", (req, res) => {
  Profile.handleProfile(req, res, db);
});

app.post("/api/companies/:name", (req, res) => {
  Company.handleCompany(req, res, db, io);
});

app.post("/api/users/logout", (req, res) => {
  Profile.handleLogout(req, res, db);
});

let port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

const io = require("socket.io").listen(server);
