'use strict';
var express = require('express');
var slideController = require('./slide/slideController');
var articleController = require('./articleController');
var elementController = require('./slide/element/elementController');
var router = express.Router();


//route for slide
router.get('/:articleId/slides', slideController.getByArticleId);
router.delete('/:articleId/slides/:slideId',slideController.deleteBySlideId);
router.post('/:articleId/slides',slideController.addNewSlide);
router.post('/:articleId/slides/:slideId',slideController.addSlideNextSlideId);
//route for subslide
router.delete('/:articleId/slides/:slideId/subslides/:subslideId',slideController.deleteSubSlideById);
router.post('/:articleId/slides/:slideId/subslides',slideController.addNewSubSlide);
router.post('/:articleId/slides/:slideId/subslides/:subslideId',slideController.addNewSubSlideNextSubSlideId);
router.get('/:articleId/slides/:slideId/subslides/:subslideId',slideController.getSubSlideById);
router.put('/:articleId/slides/:slideId/subslides/:subslideId',slideController.updateSubSlideById);

//route for element
router.post('/:articleId/slides/:slideId/subslides/:subslideId/elements',elementController.addNewElement);
router.delete('/:articleId/slides/:slideId/subslides/:subslideId/elements/:elementId',elementController.deleteElementById);
router.put('/:articleId/slides/:slideId/subslides/:subslideId/elements/:elementId',elementController.updateElementById);
module.exports = router;



