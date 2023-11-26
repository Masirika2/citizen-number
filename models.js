const mongoose = require('mongoose');

const yourSchema = new mongoose.Schema({
  generatedId: String,
});

const YourModel = mongoose.model('YourModel', yourSchema);

module.exports = YourModel;
