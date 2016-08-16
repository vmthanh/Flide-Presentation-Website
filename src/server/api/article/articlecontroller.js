'use strict';
var _ = require('lodash');
var Article = require('./articleModel');
var articleService = require('./articleService');

//Get infor of article
exports.getByArticleId = function(req,res){
	articleService.getByArticleId(req.params.articleId).then(function(responseMessage){
		var data = responseMessage.toJson();
		return res.json(data.status,data);
	})
};

exports.getAllArticles = function(req,res){
	articleService.getAllArticlesByUserId(req.params.id).then(function(responseMessage){
		var data = responseMessage.toJson();
		return res.json(data.status,data);
	})
};

exports.addNewArticle = function(req,res){

	articleService.addNewArticle(req.params.articleId).then(function(responseMessage){
		var data = responseMessage.toJson();
		return res.json(data.status,data);
	});
};
