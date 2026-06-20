const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");

const app = express();
const PORT = 5174;

// =======================================================
// MongoDB Connection
// =======================================================

mongoose
    .connect("mongodb://127.0.0.1:27017/node-project-01")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("Mongo Error:", err));

// =======================================================
// Schema
// =======================================================

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },

    last_name: {
        type: String,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    gender: {
        type: String,
    },

    job_title: {
        type: String,
    },
},
    { timestamps: true }
);

// =======================================================
// Model
// =======================================================

const User = mongoose.model("User", userSchema);

// =======================================================
// Built-in Middleware
// =======================================================

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// =======================================================
// Custom Middleware
// =======================================================

app.use((req, res, next) => {

    console.log("\n===== REQUEST RECEIVED =====");
    console.log("Method:", req.method);
    console.log("Path:", req.path);

    console.log(
        "User-Agent:",
        req.headers["user-agent"]
    );

    req.requestTime = Date.now();
    req.myName = "Aditya";

    res.setHeader(
        "X-Powered-By",
        "Aditya"
    );

    const log = `${new Date().toISOString()} | ${req.method} | ${req.path}\n`;

    fs.appendFile(
        "./log.txt",
        log,
        (err) => {
            if (err) {
                console.log(
                    "Logging Error:",
                    err
                );
            }

            next();
        }
    );
});

// =======================================================
// HTML Route
// =======================================================

app.get("/users", async (req, res) => {

    const users = await User.find({});

    const html = `
    <h1>User List</h1>
    <p>Request Time: ${req.requestTime}</p>

    <ul>
        ${users
            .map(
                (user) =>
                    `<li>${user.first_name} ${user.last_name}</li>`
            )
            .join("")}
    </ul>
    `;

    res.send(html);
});

// =======================================================
// GET ALL USERS
// =======================================================

app.route("/api/users")

    .get(async (req, res) => {

        console.log(
            "Custom Property:",
            req.myName
        );

        const users = await User.find({});

        return res.json(users);
    })

    // ===================================================
    // CREATE USER
    // ===================================================

    .post(async (req, res) => {

        try {

            const user =
                await User.create({
                    first_name:
                        req.body.first_name,

                    last_name:
                        req.body.last_name,

                    email:
                        req.body.email,

                    gender:
                        req.body.gender,

                    job_title:
                        req.body.job_title,
                });

            return res.status(201).json({
                status: "success",
                data: user,
            });

        } catch (err) {

            return res.status(400).json({
                status: "error",
                message: err.message,
            });
        }
    });

// =======================================================
// GET USER BY ID
// UPDATE USER
// DELETE USER
// =======================================================

app.route("/api/users/:id")

    // GET USER

    .get(async (req, res) => {

        const user =
            await User.findById(
                req.params.id
            );

        if (!user) {
            return res.status(404).json({
                message:
                    "User not found",
            });
        }

        return res.json(user);
    })

    // UPDATE USER

    .patch(async (req, res) => {

        const updatedUser =
            await User.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                }
            );

        if (!updatedUser) {
            return res.status(404).json({
                message:
                    "User not found",
            });
        }

        return res.json({
            status: "success",
            data: updatedUser,
        });
    })

    // DELETE USER

    .delete(async (req, res) => {

        const deletedUser =
            await User.findByIdAndDelete(
                req.params.id
            );

        if (!deletedUser) {
            return res.status(404).json({
                message:
                    "User not found",
            });
        }

        return res.json({
            status: "success",
            data: deletedUser,
        });
    });

// =======================================================
// START SERVER
// =======================================================

app.listen(PORT, () => {
    console.log(
        `Server Started at Port ${PORT}`
    );
});
