const express = require('express');
const Component = require('../../models/NewComponent');
const router = express.Router();
const ArchivedComponent = require('../../models/ArchivedComponents');

router.put('/archive-component/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const componentToArchive = await Component.findById(id);

        if (!componentToArchive) {
            return res.status(404).json({ error: 'Component not found' });
        }
        const archivedComponent = new ArchivedComponent({
            componentCategory: componentToArchive.componentCategory,
            componentName: componentToArchive.componentName,
            componentDate: componentToArchive.componentDate,
            componentCost: componentToArchive.componentCost,
            componentStatus: "Archived",
        });

        await archivedComponent.save();

        await Component.findByIdAndRemove(id);

        res.status(200).json({ message: 'Component archived successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
