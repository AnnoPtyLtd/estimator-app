const express = require('express');
const cors = require("cors");
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

const MongooseConnect = "mongodb+srv://afaqahmed123:afaqahmed123@cluster0.zibstfo.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MongooseConnect).then(() => {
    console.log("MongoDB is connected!");
});

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
UserSchema.methods.comparePassword = async function (password) {
    // Use a password hashing library like bcrypt to compare passwords
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
};


const User = mongoose.model('users', UserSchema);
User.createIndexes();

app.get("/", (req, res) => {
    res.send("Server is Working");
});


//API for sign up and register user
app.post("/signup", async (req, res) => {
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


// API for sign in
app.post("/signin", async (req, res) => {
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



//Server is running on following port
app.listen(4000);