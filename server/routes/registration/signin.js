const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../../models/User'); 

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

    const token = jwt.sign({ userId: user._id }, 'your-secret-key'); 

    res.status(200).json({ token });

  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;