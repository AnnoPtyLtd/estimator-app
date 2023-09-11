const mongoose = require('mongoose')


const recordSchema = new mongoose.Schema({
  name:String,
  quoteType:String,
  quoteDate:Date,
});


const Record = mongoose.model('records',recordSchema);


module.exports = Record;
