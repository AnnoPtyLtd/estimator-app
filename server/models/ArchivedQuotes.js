const mongoose = require('mongoose');

const archivedRecordSchema = new mongoose.Schema({
  // Define the schema for archived records here
  name: String,
  quoteType: String,
  quoteDate: Date,
  quoteCost: Number,
  quoteComps: String,
  quoteStatus: String,
});

const ArchivedRecord = mongoose.model('archivedRecords', archivedRecordSchema);

module.exports = ArchivedRecord;
