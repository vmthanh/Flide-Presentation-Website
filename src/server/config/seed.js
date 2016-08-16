/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';



var Article = require('../api/article/articleModel');
Article.find({}).remove(function() {
    Article.create({
        articleId: 0,
        articleName: "IT presentation",
        userId: 0,
        slides: [{
            slideId:0,
            subSlides:[{
                subSlideId:0,
                note:"",
                elements:[]
            }]
        }]
    });
});
