var mongoose = require('mongoose');

var DictionarySchema = new mongoose.Schema({
  _id: String,
  word:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'word'
  }],
  translation:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'word'
  }]
}, {collection: 'dictionary'});

module.exports = mongoose.model('dictionary', DictionarySchema);