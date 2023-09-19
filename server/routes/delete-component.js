const express = require('express');
const router = express.Router();
const ComponentModel = require('../models/NewComponent');

router.delete('/delete-component/:componentID', async (req, res) => {
    const componentID = req.params.componentID;
    try {
        const deletedComponent = await ComponentModel.findByIdAndDelete(componentID);
        if (deletedComponent) {
            res.json({ message: 'Component deleted successfully' });
        } else {
            res.status(404).json({ error: 'Component not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;