const express = require('express')
const router = express.Router()
const NewComponent = require('../../models/NewComponent');

router.put('/updateCompononentPrice/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { compCost, compUrl, compDate } = req.body;

    if (!compCost) {
      return res.status(400).json({ error: 'New cost is required' });
    }

    const updateFields = {
      componentCost: compCost,
      componentDate: compDate,
    };

    if (compUrl) {
      updateFields.componentUrl = compUrl;
    }

    const updatedRecord = await NewComponent.findByIdAndUpdate(
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

module.exports = router;

