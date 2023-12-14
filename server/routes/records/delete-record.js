const express = require('express');
const router = express.Router();
const Record = require('../../models/Record');
const ArchivedRecord = require('../../models/ArchivedQuotes');

router.delete('/delete-record/:recordID', async (req, res) => {
    const recordID = req.params.recordID;
    try {
        const deletedRecord = await Record.findByIdAndDelete(recordID);
        if (deletedRecord) {
            res.json({ message: 'Quote deleted successfully' });
        } else {
            res.status(404).json({ error: 'Quote not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/delete-archived-record/:recordID', async (req, res) => {
    const recordID = req.params.recordID;
    try {
        const deletedRecord = await ArchivedRecord.findByIdAndDelete(recordID);
        if (deletedRecord) {
            res.json({ message: 'Deleted successfully' });
        } else {
            res.status(404).json({ error: 'Quote not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;