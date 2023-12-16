const express = require("express");
const ArchivedRecord = require("../../models/ArchivedQuotes");
const router = express.Router();

router.get("/filter-archived", async (req, res) => {
  const category = req.query.category;
  try {
    if (category === "View All") 
        var records = await ArchivedRecord.find();
    else 
        records = await ArchivedRecord.find({ quoteType: category });
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
