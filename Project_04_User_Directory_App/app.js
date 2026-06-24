const express = require("express");
const app = express();
const path = require("path");

const userModel = require("./models/user");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/create", async (req, res) => {

    const { name, email, image } = req.body;

    await userModel.create({
        name,
        email,
        image,
    });

    res.redirect("/read");
});

app.get("/read", async (req, res) => {

    const allUser = await userModel.find();

    res.render("read", {
        users: allUser,
    });
});

app.get("/delete/:id", async (req, res) => {

    await userModel.findOneAndDelete({
        _id: req.params.id,
    });

    res.redirect("/read");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
