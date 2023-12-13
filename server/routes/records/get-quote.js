const express = require("express");
const Record = require("../../models/Record");
const ArchivedRecord = require("../../models/ArchivedQuotes");
const router = express.Router();

router.get("/getSelectedQuote/:quoteID", async (req, res) => {
  try {
    const quoteId = req.params.quoteID;
    if (!quoteId) {
      return res.status(400).json({ error: "UserID is required" });
    }
    let records = [];

    records = await Record.findById(quoteId);
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get-all-archived-quotes", async (req, res) => {
  try {
    const records = await ArchivedRecord.find();
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
