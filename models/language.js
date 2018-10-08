const mongoose = require('mongoose');

const LanguageSchema = mongoose.Schema({
    _id: String,
    name: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('language', LanguageSchema);