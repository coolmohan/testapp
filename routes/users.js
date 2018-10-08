var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.json({ word: 'word1', meaning: 'word1 meaning', description: 'word1 description' });
  res.json({ word: 'word1', suggestions: ['word1','word2','word3','word4','word5']});
});

module.exports = router;
