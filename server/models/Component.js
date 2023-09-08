const mongoose = require('mongoose');

const ComponentSchema = new mongoose.Schema({
  components1: [String],
  components2: [String],
  quoteOptions1: [String],
  quoteOptions2: [String],
  name: String,
  quoteDate: Date,
  buildFee: Number,
});

const Component = mongoose.model('components', ComponentSchema);

module.exports = Component;
