// const express = require('express');
// const bcrypt = require('bcrypt');
// const mongoose = require('mongoose');


// const UserSchema = new mongoose.Schema({
//     fullname: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
// });

// UserSchema.methods.comparePassword = async function (password) {
//     // Use a password hashing library like bcrypt to compare passwords
//     const isMatch = await bcrypt.compare(password, this.password);
//     return isMatch;
// };
// const User = mongoose.model('users', UserSchema);
// User.createIndexes();
// const router = express.Router();


// router.post("/signup", async (req, res) => {
//     try {
//         // Check if the email already exists in the database
//         const existingUser = await User.findOne({ email: req.body.email });

//         if (existingUser) {
//             res.status(400).json({ message: "User already exists" });
//             return;
//         }
//         // Hash the user's password
//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

//         const user = new User({
//             fullname: req.body.fullName,
//             email: req.body.email,
//             password: hashedPassword,
//         });

//         const savedUser = await user.save();

//         if (savedUser) {
//             res.status(200).json({ message: "User registered successfully" });
//             console.log("User registered successfully:", savedUser);
//         } else {
//             res.status(500).json({ message: "User registration failed" });
//             console.log("User registration failed");
//         }
//     } catch (error) {
//         console.error("Error registering user:", error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// });


// module.exports = router;

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import your User model

const router = express.Router();

router.post("/signup", async (req, res) => {
        try {
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        // Hash the user's password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const user = new User({
            fullname: req.body.fullName,
            email: req.body.email,
            password: hashedPassword,
        });

        const savedUser = await user.save();

        if (savedUser) {
            res.status(200).json({ message: "User registered successfully" });
            console.log("User registered successfully:", savedUser);
        } else {
            res.status(500).json({ message: "User registration failed" });
            console.log("User registration failed");
        }
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;
