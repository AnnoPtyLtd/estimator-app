const express = require('express')
const router = express.Router()
const NewComponent = require('../../models/NewComponent');

router.put('/updateComponent/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { compName, compCost, compUrl, compDate, compCategory } = req.body;

    const updateFields = {
      componentName:compName,
      componentCost: compCost,
      componentDate: compDate,
      componentUrl: compUrl,
      componentCategory: compCategory,
    };

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

