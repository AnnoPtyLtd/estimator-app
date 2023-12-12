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
    
    res.status(200).json({ message: 'Record archived successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
