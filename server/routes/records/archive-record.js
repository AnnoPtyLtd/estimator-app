const express = require('express');
const ArchivedRecord = require('../../models/ArchivedQuotes');
const Record = require('../../models/Record');
const router = express.Router();

router.put('/archive-record/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const recordToArchive = await Record.findById(id);

    if (!recordToArchive) {
      return res.status(404).json({ error: 'Record not found' });
    }
    const archivedRecord = new ArchivedRecord({
      quoteUserId: recordToArchive.quoteUserId,
      name: recordToArchive.name,
      quoteType: recordToArchive.quoteType,
      quoteDate: recordToArchive.quoteDate,
      quoteCost: recordToArchive.quoteCost,
      componentNames: recordToArchive.componentNames,
      componentPrices: recordToArchive.componentPrices,
      componentCategories: recordToArchive.componentCategories,
      componentUrls: recordToArchive.componentUrls,
      componentDates: recordToArchive.componentDates,
      quoteStatus: "Archived",
    });

    await archivedRecord.save();

    await Record.findByIdAndDelete(id);
    
    res.status(200).json(archivedRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/unarchive-record/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const recordToUnArchive = await ArchivedRecord.findById(id);

    if (!recordToUnArchive) {
      return res.status(404).json({ error: 'Archived Record not found' });
    }
    const newRecord = new Record({
      quoteUserId: recordToUnArchive.quoteUserId,
      name: recordToUnArchive.name,
      quoteType: recordToUnArchive.quoteType,
      quoteDate: recordToUnArchive.quoteDate,
      quoteCost: recordToUnArchive.quoteCost,
      componentNames: recordToUnArchive.componentNames,
      componentPrices: recordToUnArchive.componentPrices,
      componentCategories: recordToUnArchive.componentCategories,
      componentUrls: recordToUnArchive.componentUrls,
      componentDates: recordToUnArchive.componentDates,
    });

    await newRecord.save();

    await ArchivedRecord.findByIdAndDelete(id);
    
    res.status(200).json(newRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
