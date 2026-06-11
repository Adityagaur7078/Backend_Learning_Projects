const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 5174;

// Middleware - Plugin
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users
            .map((user) => `<li>${user.first_name} ${user.last_name}</li>`)
            .join("")}
    </ul>
    `;

    res.send(html);
});

// REST API
app.route("/api/users")
    .get((req, res) => {
        return res.json(users);
    })

    .post((req, res) => {
        const body = req.body;

        const newUser = {
            id: users.length
                ? users[users.length - 1].id + 1
                : 1,
            ...body,
        };

        users.push(newUser);

        fs.writeFile(
            "./MOCK_DATA.json",
            JSON.stringify(users, null, 2),
            (err) => {
                if (err) {
                    return res.status(500).json({
                        status: "error",
                        message: "Failed to save data",
                    });
                }

                return res.status(201).json({
                    status: "success",
                    data: newUser,
                });
            }
        );
    });

app.route("/api/users/:id")

    .get((req, res) => {
        const id = Number(req.params.id);

        const user = users.find((user) => user.id === id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.json(user);
    })

    .patch((req, res) => {
        const id = Number(req.params.id);

        const userIndex = users.findIndex(
            (user) => user.id === id
        );

        if (userIndex === -1) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        users[userIndex] = {
            ...users[userIndex],
            ...req.body,
        };

        fs.writeFile(
            "./MOCK_DATA.json",
            JSON.stringify(users, null, 2),
            (err) => {
                if (err) {
                    return res.status(500).json({
                        status: "error",
                        message: "Failed to update user",
                    });
                }

                return res.json({
                    status: "success",
                    data: users[userIndex],
                });
            }
        );
    })

    .delete((req, res) => {
        const id = Number(req.params.id);

        const userIndex = users.findIndex(
            (user) => user.id === id
        );

        if (userIndex === -1) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const deletedUser = users.splice(userIndex, 1);

        fs.writeFile(
            "./MOCK_DATA.json",
            JSON.stringify(users, null, 2),
            (err) => {
                if (err) {
                    return res.status(500).json({
                        status: "error",
                        message: "Failed to delete user",
                    });
                }

                return res.json({
                    status: "success",
                    data: deletedUser[0],
                });
            }
        );
    });

app.listen(PORT, () =>
    console.log(`Server started at Port ${PORT}`)
);