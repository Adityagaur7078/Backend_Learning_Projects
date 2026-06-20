const User = require("../models/User"); // adjust path if needed

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
    try {
        console.log("Custom Property:", req.myName);

        const users = await User.find({});
        return res.json(users);

    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

// CREATE USER
exports.createUser = async (req, res) => {
    try {
        const user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            gender: req.body.gender,
            job_title: req.body.job_title,
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
};

// GET USER BY ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.json(user);

    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.json({
            status: "success",
            data: updatedUser,
        });

    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.json({
            status: "success",
            data: deletedUser,
        });

    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};