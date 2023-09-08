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

// router.post("/signin", async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });

//         if (!user) {
//             res.status(401).json({ message: "Invalid credentials" });
//             return;
//         }

//         const isMatch = await user.comparePassword(password);

//         if (!isMatch) {
//             res.status(401).json({ message: "Invalid credentials" });
//             return;
//         }

//         // User authenticated successfully
//         res.status(200).json({ message: "Sign in successful" });

//     } catch (error) {
//         console.error('Error signing in:', error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// });

// module.exports = router;


const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import your User model

const router = express.Router();

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        // User authenticated successfully
        res.status(200).json({ message: "Sign in successful" });

    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;
