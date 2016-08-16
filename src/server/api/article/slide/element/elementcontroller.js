'use strict';
var _ = require('lodash');
/*var Slide = require('./slideModel');*/
var elementService = require('./elementService');

exports.addNewElement = function(req,res){
	var param = {
		articleId : req.params.articleId,
		slideId : req.params.slideId,
		subslideId: req.params.subslideId,
		newElement: req.body
	}
	
	elementService.addNewElement(param).then(function(responseMessage){
		var data = responseMessage.toJson();
		return res.json(data.status,data);
	});
}

exports.deleteElementById = function(req,res){
	var param = {
		articleId: req.params.articleId,
		slideId: req.params.slideId,
		subslideId: req.params.subslideId,
		elementId: req.params.elementId
	}
	console.log(param);
	elementService.deleteElementById(param).then(function(responseMessage){
		var data =responseMessage.toJson();
		return res.json(data.status,data);
	});
}
exports.updateElementById = function(req,res)
{

	var param = {
		articleId : req.params.articleId,
		slideId : req.params.slideId,
		subslideId : req.params.subslideId,
		elementId : req.params.elementId,
		updateElement : req.body
	}
	elementService.updateElementById(param).then(function(responseMessage){
		var data = responseMessage.toJson();
		return res.json(data.status,data);
	});
}