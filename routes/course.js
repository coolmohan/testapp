var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var courses = [];
var courseSchema = mongoose.Schema({
  courseName: String,
  courseDescription: String,
  courseDuration: String,
  courseImage: String,
  courseVideo: String
});
var courseModel = mongoose.model('course', courseSchema);

/* GET users listing. */
router.get('/', function(req, res, next) {
	courseModel.find(function (err, courseList) {
	  if (err) return console.error(err);
	  res.json(courseList);
	});
  
});

router.get('/:id', function(req, res, next) {
	courseModel.find({_id:req.params.id}, function (err, courseList) {
	  if (err) return console.error(err);
	  res.json(courseList);
	});
  
});

module.exports = router;
