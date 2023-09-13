const express = require('express')
const Record = require('../models/Record')
const router = express.Router()


router.post('/saverecord', async (req, res) => {
    try {
        const { name, quoteType, quoteDate, quoteCost } = req.body;
        if (!name || !quoteType || !quoteDate || !quoteCost) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const record = new Record({
            name,
            quoteType,
            quoteDate,
            quoteCost,
        });

        const savedRecord = await record.save();
        res.status(201).json(savedRecord);
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// Retrieve records based on quoteType
router.get('/records', async (req, res) => {
    try {
      const { quoteType } = req.query;
      if (!quoteType) {
        return res.status(400).json({ error: 'quoteType is required' });
      }
  
      const records = await Record.find({ quoteType });
      res.status(200).json(records);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Update the record's title and cost by ID
router.put('/updateTitle/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { newTitle, newCost } = req.body;

    if (!newTitle && !newCost) {
      return res.status(400).json({ error: 'New title or cost is required' });
    }

    // Define the fields you want to update
    const updateFields = {};

    if (newTitle) {
      updateFields.name = newTitle;
    }

    if (newCost) {
      updateFields.quoteCost = newCost;
    }

    const updatedRecord = await Record.findByIdAndUpdate(
      id,
      updateFields, // Update multiple fields
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;

