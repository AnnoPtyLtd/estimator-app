const express = require('express');
const User = require('../../models/User'); 
const router = express.Router();


router.post("/signup", async (req, res) => {
        try {
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const user = new User({
            fullname: req.body.fullName,
            email: req.body.email,
            password: req.body.password,

        });

        const savedUser = await user.save();

        if (savedUser) {
            res.status(200).json({ message: "User registered successfully" });
        } else {
            res.status(500).json({ message: "User registration failed" });
        }
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;
