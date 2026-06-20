const fs = require("fs");
const express = require("express");
const app = express();
const PORT = 5174;

const { connectMongoDb } = require('./connection');
const { logReqRes } = require('./middlewares/index')
const userRouter = require('./routes/user');
// =======================================================
// MongoDB Connection
// =======================================================

connectMongoDb("mongodb://127.0.0.1:27017/node-project-01")



// =======================================================
// Built-in Middleware
// =======================================================

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// =======================================================
// Custom Middleware
// =======================================================

app.use(logReqRes("log.txt"));

// Routes
app.use('/api/users', userRouter);

// =======================================================
// START SERVER
// =======================================================

app.listen(PORT, () => {
    console.log(
        `Server Started at Port ${PORT}`
    );
});
