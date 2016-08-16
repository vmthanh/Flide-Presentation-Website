'use strict';
/*var Slide = require('../slide/slideModel');*/
var Article = require('../articleModel');


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

// Get list of things
exports.getByArticleId = function(articleId) {
    var def = require('../../common/model/promise').create();
    if (isNaN(articleId)) {
        var responseMessage = require("../../common/model/responseMessage").create();
        responseMessage.setStatus(500);
          def.resolve(responseMessage);
    } else {
        
        /*Should wrap this into repository if need*/
        Article.find({
            articleId: articleId
        }, function(err, items) {
            var responseMessage = require("../../common/model/responseMessage").create();
            if (err) {
                console.log(err);
                responseMessage.setStatus(500);
                def.resolve(responseMessage);
            } else {

                if (items.length > 0) {
                    responseMessage.setData(items);
                    def.resolve(responseMessage);
                } else {
                    var newArticle = new Article({
                        articleName: "",
                        articleId: articleId,
                        userId: 0,
                        slides: [{
                            slideId: 0,
                            subSlides: [{
                                subSlideId: 0,
                                note: "",
                                elements: []
                            }]
                        }]
                    });
                    newArticle.save(function(error, article_Save) {
                        if (error) {
                            responseMessage.setStatus(500);
                            console.log(error);
                        } else {
                            var mArticle_Save = [];
                            mArticle_Save.push(article_Save);
                            responseMessage.setData(mArticle_Save);

                        }
                        def.resolve(responseMessage);
                    });
                }
            }



        });
    }
    return def;
};


exports.deleteBySlideId = function(articleId, slideId) {
    var def = require('../../common/model/promise').create();
    Article.findOne({
        articleId: articleId
    }, function(err, article) {
        var responseMessage = require("../../common/model/responseMessage").create();
        if (err) {
            console.log(err);
            responseMessage.setStatus(500);
            def.resolve(responseMessage);
        } else {
            slideId = Number(slideId);

            responseMessage.setStatus(500);
            if (typeof article.slides[slideId] !== 'undefined') {
                article.slides.splice(slideId, 1);
                normalize(article);
                article.save();
                responseMessage.setStatus(200);
            }

            def.resolve(responseMessage);
        }
    });
    return def;
}


exports.addSlideNextSlideId = function(param) {
    var def = require("../../common/model/promise").create();
    Article.findOne({
        articleId: param.articleId
    }, function(err, article) {
        var responseMessage = require("../../common/model/responseMessage").create();
        if (err) {
            console.log(err);
            responseMessage.setStatus(500);
            def.resolve(responseMessage);
        } else {

            var newSlide = {
                subSlides: [{
                    note: "",
                    elements: []
                }]
            }
            var slideId = Number(param.slideId);
            var sideIndex = Number(param.sideIndex);
            if (sideIndex === 0) //Insert at left
            {
                article.slides.splice(slideId, 0, newSlide);

            } else { //Insert at right
                article.slides.splice(slideId + 1, 0, newSlide);
            }
            normalize(article);
            article.save();
            if (sideIndex === 0) {
                responseMessage.setData(article.slides[slideId]);
            } else {
                responseMessage.setData(article.slides[slideId + 1]);
            }

            responseMessage.setStatus(201);
            def.resolve(responseMessage);
        }
    });

    return def;
}

exports.addNewSlide = function(articleId) {
    var def = require("../../common/model/promise").create();
    Article.findOne({
        articleId: articleId
    }, function(err, article) {
        var responseMessage = require("../../common/model/responseMessage").create();
        if (err) {
            console.log(err);
            responseMessage.setStatus(500);
            def.resolve(responseMessage);
        } else {

            var newSlide = {
                subSlides: [{
                    note: "",
                    elements: []
                }]
            }
            article.slides.push(newSlide);
            normalize(article);
            article.save();
            responseMessage.setData(article.slides[article.slides.length - 1]);
            responseMessage.setStatus(201);
            def.resolve(responseMessage);
        }
    });
    return def;
}

exports.deleteSubSlideById = function(param) {
    var def = require("../../common/model/promise").create();
    Article.findOne({
        articleId: param.articleId
    }, function(err, article) {
        var responseMessage = require("../../common/model/responseMessage").create();
        if (err) {
            responseMessage.setStatus(500);
            console.log(err);
            def.resolve(responseMessage);
        } else {
            var slideId = Number(param.slideId);
            var subSlideId = Number(param.subSlideId);

            responseMessage.setStatus(500);
            if ((typeof article.slides[slideId] !== 'undefined') && (typeof article.slides[slideId].subSlides[subSlideId] !== 'undefined')) {
                article.slides[slideId].subSlides.splice(subSlideId, 1);
            }
            normalize(article);
            article.save();
            responseMessage.setStatus(200);
            def.resolve(responseMessage);
        }
    });
    return def;
}


exports.addNewSubSlideNextSubSlideId = function(param) {
    var def = require("../../common/model/promise").create();
    Article.findOne({
        articleId: param.articleId
    }, function(err, article) {
        var responseMessage = require("../../common/model/responseMessage").create();
        if (err) {
            console.log(err);
            responseMessage.setStatus(500);
            def.resolve(responseMessage);
        } else {
            var slideId = Number(param.slideId);
            var subSlideId = Number(param.subSlideId);
            var sideIndex = Number(param.sideIndex);

            responseMessage.setStatus(500);
            var newSubSlide = {
                note: "",
                elements: []
            }
            if (sideIndex === 0) {
                article.slides[slideId].subSlides.splice(subSlideId, 0, newSubSlide);
            } else {

                article.slides[slideId].subSlides.splice(subSlideId + 1, 0, newSubSlide);
            }
            normalize(article);
            article.save();

            if (sideIndex === 0) {
                responseMessage.setData(article.slides[slideId].subSlides[subSlideId]);
            } else {
                responseMessage.setData(article.slides[slideId].subSlides[subSlideId + 1]);
            }
            responseMessage.setStatus(201);
            def.resolve(responseMessage);
        }

    });
    return def;
}

exports.addNewSubSlide = function(articleId, slideId) {
    var def = require("../../common/model/promise").create();
    Article.findOne({
        articleId: articleId
    }, function(err, article) {
        var responseMessage = require("../../common/model/responseMessage").create();
        if (err) {
            responseMessage.setStatus(500);
            console.log(err);
            def.resolve(responseMessage);
        } else {
            slideId = Number(slideId);

            responseMessage.setStatus(500);

            var newSubSlide = {
                note: "",
                elements: []
            }
            article.slides[slideId].subSlides.push(newSubSlide);
            normalize(article);
            article.save();
            responseMessage.setStatus(201);
            responseMessage.setData(article.slides[slideId].subSlides[article.slides[slideId].subSlides.length - 1]);
            def.resolve(responseMessage);
        }

    });
    return def;
}

exports.getSubSlideById = function(param) {
    var def = require("../../common/model/promise").create();
    Article.findOne({
        articleId: param.articleId
    }, function(err, article) {
        var responseMessage = require("../../common/model/responseMessage").create();
        if (err) {
            console.log(err)
            responseMessage.setStatus(500);
            def.resolve(responseMessage)
        } else {
            var slideId = Number(param.slideId);
            var subslideId = Number(param.subslideId);

            responseMessage.setStatus(500);
            responseMessage.setData(article.slides[slideId].subSlides[subslideId]);
            responseMessage.setStatus(200);
            def.resolve(responseMessage);
        }
    });
    return def;
}

exports.updateSubSlideById = function(param) {
    var def = require("../../common/model/promise").create();
    Article.findOne({
        articleId: param.articleId
    }, function(err, article) {
        var responseMessage = require("../../common/model/responseMessage").create();
        if (err) {
            console.log(err);
            responseMessage.setStatus(500);
            def.resolve(responseMessage);
        } else {
            var slideId = Number(param.slideId);
            var subSlideId = Number(param.subSlideId);

            responseMessage.setStatus(500);
            if ((typeof article.slides[slideId] !== 'undefined') && (typeof article.slides[slideId].subSlides[subSlideId] !== "undefined")) {
                article.slides[slideId].subSlides[subSlideId].note = param.newSubSlide.note;
                article.slides[slideId].subSlides[subSlideId].elements = param.newSubSlide.elements;
            }

            article.save();
            responseMessage.setData(param.newSubSlide);
            responseMessage.setStatus(200);
            def.resolve(responseMessage);
        }

    });
    return def;
}
