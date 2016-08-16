'use strict';
var Article = require('./articleModel');
//Get info of article
exports.getByArticleId = function(articleId) {
    var def = require('../common/model/promise').create();
    Article.find({
        articleId: articleId
    }, function(err, items) {
        var responseMessage = require("../common/model/responseMessage").create();
        if (err) {
            console.log(err);
            responseMessage.setStatus(500);
        } else {
            responseMessage.setData(items);
        }
        def.resolve(responseMessage);
    });
    return def;
}

exports.getAllArticlesByUserId = function(userId) {
    var def = require('../common/model/promise').create();
    Article.find({
        userId: userId
    }, function(err, items) {
        var responseMessage = require("../common/model/responseMessage").create();
        if (err) {
            console.log(err);
            responseMessage.setStatus(500);
        } else {
            responseMessage.setData(items);
        }
        def.resolve(responseMessage);
    });
    return def;
}

exports.addNewArticle = function(articleID) {
    var def = require('../common/model/promise').create();
   /* var newArticle = {
        articleName: "",
        userId: 0,
        articleId: articleId,
        slides: []
    }*/

    var newArticle = new Article({
        articleName:"",
        articleId:articleID,
        userId:0,

    });
    newArticle.save(function(err,article_Save){
            var responseMessage = require("../common/model/responseMessage").create();

        if(err){
            responseMessage.setStatus(500);
            responseMessage.setData("Can not save new article");
            console.log(err);
        }
        else{
            responseMessage.setStatus(201);
            responseMessage.setData(article_Save);
     
        }
        def.resolve(responseMessage);
    });
    return def;
}
