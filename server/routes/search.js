const express = require("express");
const router = express.Router();
const NewComponent = require("../models/NewComponent");
const Record = require("../models/Record");
const ArchivedRecord = require("../models/ArchivedQuotes");

router.get("/search", async (req, res) => {
  try {
    const { searchTerm } = req.query;

    if (!searchTerm) {
      return res.status(400).json({ error: "Search term is required" });
    }
    const components = await NewComponent.find({
      componentName: { $regex: new RegExp(searchTerm, "i") },
    });
    const records = await Record.find({
      name: { $regex: new RegExp(searchTerm, "i") },
    });

    res.status(200).json({ components, records });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/searchall", async (req, res) => {
  try {
    const { searchTerm } = req.query;
    // const { userId } = req.query;

    if (!searchTerm) {
      return res.status(400).json({ error: "Search term is required" });
    }

    // if (!userId) {
    //   return res.status(400).json({ error: "No user id fournd!" });
    // }

    const records = await Record.find({
      // quoteUserId: userId,
      name: { $regex: new RegExp(searchTerm, "i") },
    });
    
    const archivedRecords = await ArchivedRecord.find({
      name: { $regex: new RegExp(searchTerm, "i") },
    });

    res.status(200).json({ records, archivedRecords });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
