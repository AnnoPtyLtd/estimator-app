const mongoose = require('mongoose');

const archivedComponentSchema = new mongoose.Schema({
    componentCategory: String,
    componentName: String,
    componentDate: Date,
    componentCost: Number,
    componentStatus:String,
});

const ArchivedComponent = mongoose.model('archivedcomponents', archivedComponentSchema);

module.exports = ArchivedComponent;
