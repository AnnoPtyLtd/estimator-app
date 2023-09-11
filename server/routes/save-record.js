const express = require('express')
const Record = require('../models/Record')
const router = express.Router()


router.post('/saverecord', async (req, res) => {
    try {
        const { name, quoteType, quoteDate } = req.body;
        if (!name || !quoteType || !quoteDate) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const record = new Record({
            name,
            quoteType,
            quoteDate,
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

module.exports = router;

