const express = require('express');
const router = express.Router();
const NewComponent = require('../models/NewComponent');

router.delete('/remove-component', async (req, res) => {
    try {
        const componentId = req.query.id; // Assuming you pass the component ID as a query parameter

        // Check if the component exists
        const component = await NewComponent.findById(componentId);
        if (!component) {
            return res.status(404).json({ message: 'Component not found' });
        }

        // Remove the component
        await NewComponent.deleteOne({ _id: componentId });

        res.status(200).json({ message: 'Component removed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error removing component' });
    }
});

module.exports = router;
