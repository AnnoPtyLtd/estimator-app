const express = require('express');
const router = express.Router();
const Record = require('../../models/Record');

router.get('/export-records', async (req, res) => {
    try {
      const quoteType = req.query.quoteType;
      if ( !quoteType) {
        return res.status(400).json({ error: 'quoteType required' });
      }
      const records = await Record.find({ quoteType: quoteType });
      res.status(200).json(records);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;