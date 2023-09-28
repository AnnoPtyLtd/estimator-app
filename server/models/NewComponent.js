const mongoose = require('mongoose');

const NewComponentSchema = new mongoose.Schema({
    componentCategory: String,
    componentName: String,
    componentDate: Date,
    componentCost: Number,
    componentUrl: String,
});

const NewComponent = mongoose.model('usercomponents', NewComponentSchema);

module.exports = NewComponent;
