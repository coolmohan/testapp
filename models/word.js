const mongoose = require('mongoose');

const WordSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    name: String,
    languagee_id: Number,
    word_type_id: Number
}, {collection: 'word'});

module.exports = mongoose.model('word', WordSchema);