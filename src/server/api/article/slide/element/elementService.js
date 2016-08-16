'use strict';
var Article = require('../../articleModel');

function normalize(article) {
    for (var i = 0; i < article.slides.length; ++i) {
        article.slides[i].slideId = i;
        for (var j = 0; j < article.slides[i].subSlides.length; ++j) {
            article.slides[i].subSlides[j].subSlideId = j;
            for (var k = 0; k < article.slides[i].subSlides[j].elements.length; ++k)
                article.slides[i].subSlides[j].elements[k].elementId = k;
        }
    }

}

exports.addNewElement = function(param) {

    var def = require('../../../common/model/promise').create();

    Article.findOne({
        articleId: param.articleId
    }, function(err, article) {
        var responseMessage = require('../../../common/model/responseMessage').create();
        if (err) {
            console.log(err);
            responseMessage.setStatus(500);
            def.resolve(responseMessage);
        } else {
            var slideId = Number(param.slideId);
            var subslideId = Number(param.subslideId);

            if (err) {
                console.log(err);
                responseMessage.setStatus(500);
            } else {
                if (param.newElement.typeE === "header") {
                    if ((article.slides[slideId].subSlides[subslideId].elements.length ===0)||(article.slides[slideId].subSlides[subslideId].elements[0].typeE !== "header")) {
                        article.slides[slideId].subSlides[subslideId].elements.unshift(param.newElement);
                        normalize(article);
                        article.save();
                    }
                    responseMessage.setStatus(201);
                    responseMessage.setData(article.slides[slideId].subSlides[subslideId].elements[0]);
                    def.resolve(responseMessage);
                } else {
                    article.slides[slideId].subSlides[subslideId].elements.push(param.newElement);
                    normalize(article);
                    article.save();
                    responseMessage.setStatus(201);
                    var currentElementIndex = article.slides[slideId].subSlides[subslideId].elements.length - 1;
                    responseMessage.setData(article.slides[slideId].subSlides[subslideId].elements[currentElementIndex]);
                    def.resolve(responseMessage);
                }

            }
        }

    });
    return def;
}

exports.deleteElementById = function(param) {
    console.log(param)
    var def = require('../../../common/model/promise').create();
    Article.findOne({
        articleId: param.articleId
    }, function(err, article) {
        var responseMessage = require('../../../common/model/responseMessage').create();
        if (err) {
            console.log(err);
            responseMessage.setStatus(500);
            def.resolve(responseMessage);
        } else {
            var slideId = Number(param.slideId);
            var subslideId = Number(param.subslideId);

            if ((typeof article.slides[slideId].subSlides[subslideId] !== 'undefined') && (typeof article.slides[slideId].subSlides[subslideId].elements[param.elementId] !== 'undefined')) {
                article.slides[slideId].subSlides[subslideId].elements.splice(param.elementId, 1);
            }
            normalize(article);
            article.save();
            responseMessage.setStatus(200);
            def.resolve(responseMessage);

        }

    });
    return def;
}

exports.updateElementById = function(param) {

    var def = require('../../../common/model/promise').create();
    Article.findOne({
        articleId: param.articleId
    }, function(err, article) {
        var responseMessage = require('../../../common/model/responseMessage').create();
        if (err) {
            console.log(err);
            responseMessage.setStatus(500);
            def.resolve(responseMessage);
        } else {
            var slideId = Number(param.slideId);
            var subslideId = Number(param.subslideId);
            var elementId = Number(param.elementId)


            if ((typeof article.slides[slideId].subSlides[subslideId] !== 'undefined') && (typeof article.slides[slideId].subSlides[subslideId].elements[elementId] !== 'undefined')) {
                article.slides[slideId].subSlides[subslideId].elements[elementId].detail = param.updateElement.detail;
            }
            normalize(article);
            article.save();
            responseMessage.setStatus(200);
            responseMessage.setData(param.updateElement);
            def.resolve(responseMessage);

        }

    });
    return def;
}
