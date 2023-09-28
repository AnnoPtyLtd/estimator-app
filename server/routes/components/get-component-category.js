const express = require('express');
const router = express.Router();
const ComponentModel = require('../../models/NewComponent');

router.get('/get-category-by-name', async (req, res) => {
    const componentName = req.query.name;

    try {
        if (!componentName) {
            return res.status(400).json({ error: 'Component name is required' });
        }
        const nameWithoutPrice = componentName.replace(/\([^)]*\)/, '').trim();
        const component = await ComponentModel.findOne({
            componentName: { $regex: new RegExp(nameWithoutPrice, 'i') }
        });

        if (!component) {
            return res.status(404).json({ error: 'Component not found' });
        }
        res.json({ category: component.componentCategory });
        console.log(component.componentCategory)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
