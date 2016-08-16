'use strict';
var _ = require('lodash');
/*var Slide = require('./slideModel');*/
var slideService = require('../slide/slideService');

// Get list of things
exports.getByArticleId = function(req, res) {
  slideService.getByArticleId(req.params.articleId).then(function(responseMessage){
      var data = responseMessage.toJson();
      return res.json(data.status, data);
  })
};

exports.deleteBySlideId = function(req,res){
	slideService.deleteBySlideId(req.params.articleId,req.params.slideId).then(function(responseMessage){
		var data = responseMessage.toJson();
		return res.json(data.status,data);
	})
};

exports.addNewSlide = function(req,res){
	slideService.addNewSlide(req.params.articleId).then(function(responseMessage){
		var data = responseMessage.toJson();
		return res.json(data.status,data);
	})
};


exports.addSlideNextSlideId = function(req,res){
	var param = {
		articleId: req.params.articleId,
		slideId: req.params.slideId,
		sideIndex: req.query.sideIndex
	}
	slideService.addSlideNextSlideId(param).then(function(responseMessage){
		var data = responseMessage.toJson();
		return res.json(data.status,data);
	});
};


exports.deleteSubSlideById = function(req,res){
	var param = {
		articleId: req.params.articleId,
		slideId: req.params.slideId,
		subSlideId: req.params.subslideId
	}
	slideService.deleteSubSlideById(param).then(function(responseMessage){
		var data = responseMessage.toJson();
		return res.json(data.status,data);
	})
};

exports.addNewSubSlide = function(req,res){
	slideService.addNewSubSlide(req.params.articleId,req.params.slideId).then(function(responseMessage){
		var data = responseMessage.toJson();
		return res.json(data.status,data);
	});
}


exports.addNewSubSlideNextSubSlideId = function(req,res)
{
	var param = {
		articleId: req.params.articleId,
		slideId: req.params.slideId,
		subSlideId: req.params.subslideId,
		sideIndex: req.query.sideIndex
	}
	slideService.addNewSubSlideNextSubSlideId(param).then(function(responseMessage){
		var data = responseMessage.toJson();
		return res.json(data.status,data);
	});
}

exports.getSubSlideById = function(req,res){
	var param = {
		articleId: req.params.articleId,
		slideId: req.params.slideId,
		subslideId: req.params.subslideId
	}
	slideService.getSubSlideById(param).then(function(responseMessage){
		var data = responseMessage.toJson();
		return res.json(data.status,data);
	});
}

exports.updateSubSlideById = function(req,res){
	var param = {
		articleId: req.params.articleId,
		slideId: req.params.slideId,
		subSlideId: req.params.subslideId,
		newSubSlide:req.body
	}

	slideService.updateSubSlideById(param).then(function(responseMessage){
		var data = responseMessage.toJson();
		return res.json(data.status,data);
	});
}