const express = require("express");
const app = express();

const userModel = require('./usermodel');

app.get("/", ( req, res ) => {
    res.send("Hello from MongoDb");
    res.send(console.log("Hello from MongoDb app.js"));
});

app.get("/create", async ( req, res ) => {
    let createUser = await userModel.create({
        name: "develo",
        email: "dam@gmail.com",
        username: "delta"
    });

    res.send(createUser);
});

app.get("/read", async ( req, res ) => {
    let readUser = await userModel.find()

    res.send(readUser);
});

app.get("/update", async ( req, res ) => {
    let updateUser = await userModel.findOneAndUpdate({_id: "6a3c1b176111702cf0b3943d"}, {username: "notebook"}, {new: true})

    res.send(updateUser);
});

app.get("/delete", async ( req, res ) => {
    let deleteUser = await userModel.findOneAndDelete({_id: "6a3c1c60d42f7622058fca09"})

    res.send(deleteUser);
});

app.listen(3000);
