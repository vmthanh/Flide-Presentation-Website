'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var SlideSchema = new Schema({
  id:String,
  articleId:Number,
  header:  Schema.Types.Mixed,
  subHeader: String,
  note: String,
  slides:[]
});
module.exports = mongoose.model('Slide', SlideSchema);
