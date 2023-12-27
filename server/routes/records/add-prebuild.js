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
    let quoteStatus = 'prebuild';

    const record = new Prebuild({
      name,
      quoteType,
      quoteBudget,
      quoteStatus,
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

router.get("/get-prebuild-quotes", async (req, res) => {
  try {
    const quoteType = req.query.quoteType;
    if (!quoteType) {
      return res.status(400).json({ error: "quoteType is required" });
    }
    let records = [];
    if (quoteType === "View All") {
      records = await Prebuild.find();
    } else {
      records = await Prebuild.find({ quoteType: quoteType });
    }
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
