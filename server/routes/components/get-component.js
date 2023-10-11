const express = require('express');
const router = express.Router();
const app = express();


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

router.get('/get-components-all', async (req, res) => {
  try {
    let components;
    components = await ComponentModel.find();
    res.json(components);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;