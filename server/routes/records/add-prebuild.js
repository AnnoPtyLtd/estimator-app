const express = require("express");
const Prebuild = require("../../models/Prebuilds");
const router = express.Router();

router.post("/save-prebuild-quote", async (req, res) => {
  try {
    const {
      name,
      quoteType,
      quoteBudget,
      buildFee,
      quoteDate,
      quoteCost,
      componentNames,
      componentPrices,
      componentCategories,
      componentUrls,
      componentDates,
    } = req.body;

    if (!name || !quoteType || !quoteBudget || !quoteDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    const record = new Prebuild({
      name,
      quoteType,
      quoteBudget,
      buildFee,
      quoteDate,
      quoteCost,
      componentNames,
      componentPrices,
      componentCategories,
      componentUrls,
      componentDates,
    });

    const savedRecord = await record.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
