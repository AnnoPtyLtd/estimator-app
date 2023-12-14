const express = require('express');
const router = express.Router();
const NewComponent = require('../../models/NewComponent');

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
    console.log(newComponent);
    
    res.status(201).json({ message: 'Component saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving component' });
  }
});

router.post('/save-components', async (req, res) => {
  try {
    const jsonData = req.body; // Assuming frontend sends JSON data

    const today = new Date(); // Get today's date

    const processedData = jsonData.map((item) => {
      return {
        componentCategory: item.componentCategory || '',
        componentName: item.componentName || '',
        componentDate: item.componentDate || today,
        componentCost: item.componentCost || 0,
        componentUrl: item.componentUrl || '',
      };
    });

    await NewComponent.insertMany(processedData); // Save all components to the database

    res.status(201).json({ message: 'Components saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving components' });
  }
});


module.exports = router;
