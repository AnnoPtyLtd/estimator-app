const express = require('express');
const router = express.Router();
const ComponentModel = require('../../models/NewComponent');

router.get('/get-components', async (req, res) => {
  const category = req.query.category;

  try {
    let components;

    if (category && category !== 'View All') {
      components = await ComponentModel.find({ componentCategory: category });
    } else {
      components = await ComponentModel.find();
    }

    res.json(components);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;