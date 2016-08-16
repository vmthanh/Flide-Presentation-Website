'use strict';
var mongoose = require('mongoose'),
Schema = mongoose.Schema;
var ArticleSchema = new Schema({
	articleId:Number,
	articleName: String,
	userId:Number,
	slides:[{
		slideId:Number,
		subSlides:[
		{
			subSlideId: Number,
			note: String,
			elements: [
			{
				elementId:Number,
				typeE: String,
				detail:Schema.Types.Mixed,
			}
			]
		}
		]
	}]
});
module.exports = mongoose.model('Article',ArticleSchema);