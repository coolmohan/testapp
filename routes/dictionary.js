var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Dictionary = mongoose.model('dictionary');
var Word = mongoose.model('word');
var async = require("async");

/* GET word suggestion. */
router.get('/suggestion/:word', function(req, res, next) {
  var suggestions = ["aa","bb"];
  for(var i=0; i<6; i++)
  	suggestions.push(req.params.word+" "+i);
  res.json(suggestions);
});
var output1 = [];
var str = "word1L1";
//var promise = new mongoose.Promise;
/* GET word suggestion. */
router.post('/findword', function(req, res, next) {
	//res.json(req.body.word);
	Word.findOne({ name: req.body.word }).exec()
	.then(function(words){
		console.log(words);
		return Dictionary.find({ "word": words._id }).populate('word').populate('translation').exec()
    .then(function(dictionarys){
    	return dictionaryObj(dictionarys);
    }).then(function(result){
    	res.json(result);
    });
	});
});
router.get('/findword/:word', function(req, res, next) {
	Word.findOne({ name: req.params.word }).exec()
	.then(function(words){
		return Dictionary.find({ "word": words._id }).populate('word').populate('translation').exec()
    .then(function(dictionarys){
    	return dictionaryObj(dictionarys);
    }).then(function(result){
    	res.json(result);
    });
	});
});
function dictionaryObj(dictionarys) { 
	//console.log(dictionarys);
	var o = {};
	var key = 'word_list';
	o[key] = [];
	var output2 = [];
	dictionarys.forEach(function (word) {
		o[key].push(word.translation.name);
	});
  return o;
}

/* GET word suggestion. */
router.post('/', function(req, res, next) { 
	//res.send('aa - '+req.body.word);
  res.json({ word: req.body.word, meaning: req.body.word+' meaing', description: req.body.word+' description'});
});

router.get('/addword', function(req, res, next) {
	res.render('dictionary/addword', { title: 'Express' });
	//res.json("aa");
});

router.post('/addword', function(req, res, next) {
	var word = new Word({
		name: req.body.word,
		languagee_id: req.body.languagee_id,
		word_type_id: req.body.word_type_id
	});
	word.save(function(err) {
  	if (err) throw err;
  	console.log('Word saved !');
	});
	res.render('dictionary/addword', { message: 'Word saved !' });
});

router.get('/adddictionary', function(req, res, next) {
	Word.find({}).exec()
	.then(function(words){
		res.render('dictionary/adddictionary', { words: words });
	});
	//res.json("aa");
});

router.post('/adddictionary', function(req, res, next) {
	var word = new Word({
		name: req.body.word,
		languagee_id: req.body.languagee_id,
		word_type_id: req.body.word_type_id
	});
	word.save(function(err) {
  	if (err) throw err;
  	console.log('Word saved !');
	});
	res.render('dictionary/addword', { message: 'Word saved !' });
});

module.exports = router;
