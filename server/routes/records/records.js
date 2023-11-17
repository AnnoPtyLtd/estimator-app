const express = require('express')
const Record = require('../../models/Record')
const router = express.Router()
const NewComponent = require('../../models/NewComponent');

router.post('/saverecord', async (req, res) => {
  try {
    const { userId, name, quoteType, quoteDate, quoteCost, componentNames, componentPrices, componentCategories,componentUrls } = req.body;

    if (!userId || !name || !quoteType || !quoteDate) {
      return res.status(400).json({ error: 'Missing required fields or id' });
    }
    const record = new Record({
      userId,
      name,
      quoteType,
      quoteDate,
      quoteCost,
      componentNames,
      componentPrices,
      componentCategories,
      componentUrls,
    });

    const savedRecord = await record.save();
    res.status(201).json(savedRecord);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.get('/records', async (req, res) => {
  try {
    const userId = req.query.userId;
    const id = req.query.id;
    if (!userId || !id) {
      return res.status(400).json({ error: 'quoteType and userId are required' });
    }
    const records = await Record.find({ quoteUserId: userId, _id: id });
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//target
router.get('/adminrecords', async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(400).json({ error: 'id is required' });
    }
    const records = await Record.find({ _id: id });
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/getadminrecords', async (req, res) => {
  try {
    const quoteType = req.query.quoteType;
    if (!quoteType) {
      return res.status(400).json({ error: 'quoteType is required' });
    }
    let records = [];
    if (quoteType === 'View All') {
      records = await Record.find();
    }
    else {
      records = await Record.find({ quoteType: quoteType });
    }
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/getuserrecords', async (req, res) => {
  try {
    const userId = req.query.userId;
    const quoteType = req.query.quoteType;
    if (!userId) {
      return res.status(400).json({ error: 'UserID is required' });
    }
    let records = [];
    if (quoteType === 'View All') {
      records = await Record.find({ quoteUserId: userId });
    }
    else {
      records = await Record.find({ quoteUserId: userId, quoteType: quoteType });
    }
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/getuserrecords1', async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: 'UserID is required' });
    }
    let records = [];

    records = await Record.find({ quoteUserId: userId });
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/getadminquotes', async (req, res) => {
  try {
    const records = await Record.find();
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/updateTitle/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { newTitle } = req.body;

    if (!newTitle) {
      return res.status(400).json({ error: 'New title or cost is required' });
    }
    const updateFields = {};
    if (newTitle) {
      updateFields.name = newTitle;
    }

    const updatedRecord = await Record.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/add-components-to-build/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { componentNames, componentPrices, componentCategories,componentUrls } = req.body;

    if (!componentNames || !Array.isArray(componentNames) || !componentPrices || !Array.isArray(componentPrices) || !componentCategories || !Array.isArray(componentCategories) || componentNames.length !== componentPrices.length || componentPrices.length !== componentCategories.length) {
      return res.status(400).json({ error: 'Invalid component data' });
    }

    const existingRecord = await Record.findById(id);

    if (!existingRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }

    // Update component names and prices separately in the record
    existingRecord.componentNames = componentNames;
    existingRecord.componentPrices = componentPrices;
    existingRecord.componentCategories = componentCategories;
    existingRecord.componentUrls = componentUrls;
    existingRecord.quoteDate = new Date();
    // Calculate total cost based on component prices
    const totalCost = componentPrices.reduce((acc, price) => acc + price, 0);
    existingRecord.quoteCost = Number(totalCost.toFixed(2));

    const updatedRecord = await existingRecord.save();
    res.status(200).json(updatedRecord);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/get-components-by-record/:recordID', async (req, res) => {
  try {
    const { recordID } = req.params;

    const record = await Record.findById(recordID);

    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    const { componentNames, componentPrices, componentCategories } = record;

    res.json({ componentNames, componentPrices, componentCategories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;