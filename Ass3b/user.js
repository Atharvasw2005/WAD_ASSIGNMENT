// user.js
// Full CRUD API using Node.js + Express.js + MongoDB (Mongoose)

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// =======================
// MongoDB Connection
// =======================
mongoose.connect("mongodb://127.0.0.1:27017/userdb")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

// =======================
// User Schema
// =======================
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

// =======================
// CREATE User
// =======================
app.post("/users", async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();

        res.status(201).json({
            message: "User created successfully",
            data: savedUser
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// =======================
// READ All Users
// =======================
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            message: "Users fetched successfully",
            data: users
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// =======================
// READ Single User
// =======================
app.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User fetched successfully",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// =======================
// UPDATE User
// =======================
app.put("/users/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User updated successfully",
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// =======================
// DELETE User
// =======================
app.delete("/users/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// =======================
// Server Start
// =======================
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});