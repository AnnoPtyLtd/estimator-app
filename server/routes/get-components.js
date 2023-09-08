const express = require('express');
const router = express.Router();
const Component = require('../models/Component'); 

router.get('/components', async (req, res) => {
  try {
    const components = await Component.find(); // Fetch all components from MongoDB
    res.json(components);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
