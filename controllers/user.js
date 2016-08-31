/**
 * Created by bw964 on 2016-08-05.
 */
var request = require("request");
var mongoose = require("mongoose");
var passwordHash = require("../utils/passwordUtils").hashPassword;

var User = require("../models/user");

var db = "mongodb://localhost/newsfeed1";

mongoose.createConnection(db);

function login(req, res) {
    if(!req.body.username || !req.body.password) {
        res.status(400);
        res.send("username and password are required");
        return;
    }
    console.log("Login: " + req.body.username);

    User.findOne({"username": req.body.username, "password": passwordHash(req.body.password)}).exec(function (err, user) {
       if(!err && user && user != null) {
           console.log("Login success");
           res.send("login success");
       } else {
           console.log("Login failed");
           res.status(401);
           res.send("invalid credentials");
       }
    });
}

function signUp(req, res) {
    if(!req.body.username || !req.body.password) {
        res.status(400);
        res.send("username and password are required");
        return;
    }
    console.log("Sign up: " + req.body.username);

    User.count({"username": req.body.username}).exec(function (err, count) {
        if(!err && count === 0) {
            req.body.password = passwordHash(req.body.password);
            User.create(req.body, function(err, res2) {
                if(!err) {
                    console.log("sign up success");
                    res.send("sign up success");
                } else {
                    console.log("sign up failed");
                    res.status(400);
                    res.send("user may already exist");
                }
            });
        } else {
            console.log("sign up failed");
            res.status(400);
            res.send("user may already exist");
        }
    });
}

exports.login = login;

exports.signUp = signUp;