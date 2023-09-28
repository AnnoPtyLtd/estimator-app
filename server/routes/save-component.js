const express = require('express');
const router = express.Router();
const NewComponent = require('../models/NewComponent');

router.post('/save-newcomponent', async (req, res) => {
  try {
    const { componentCategory, componentName, componentDate, componentCost,componentUrl } = req.body;

    const newComponent = new NewComponent({
      componentCategory,
      componentName,
      componentDate,
      componentCost,
      componentUrl,
    });

    await newComponent.save();

    res.status(201).json({ message: 'Component saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving component' });
  }
});

module.exports = router;
