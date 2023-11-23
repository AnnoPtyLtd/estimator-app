const express = require('express');
const router = express.Router();

// Import your record and component models
const Record = require('../../models/Record');

// Define a route to delete a component by index
router.delete('/delete-component/:recordID/:index', async (req, res) => {
    try {
        const { recordID, index } = req.params;

        // Find the record by its ID
        const record = await Record.findById(recordID);

        if (!record) {
            return res.status(404).json({ error: 'Record not found' });
        }

        // Get the arrays of component names, prices, and categories
        const { componentNames, componentPrices, componentCategories,componentUrls } = record;

        // Check if the index is valid
        if (index < 0 || index >= componentNames.length) {
            return res.status(400).json({ error: 'Invalid index' });
        }

        // Remove the component, price, and category at the specified index
        componentNames.splice(index, 1);
        componentPrices.splice(index, 1);
        componentCategories.splice(index, 1);
        componentUrls.splice(index,1)

        // Recalculate the total cost
        const totalCost = componentPrices.reduce((acc, price) => acc + price, 0);

        // Update the record with the modified arrays
        record.componentNames = componentNames;
        record.componentPrices = componentPrices;
        record.componentCategories = componentCategories;
        record.componentUrls = componentUrls;
        record.quoteCost = totalCost;

        // Save the updated record
        const updatedRecord = await record.save();

        res.json(updatedRecord);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
