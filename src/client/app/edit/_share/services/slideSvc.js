'use strict';

angular.module('flideApp').factory("slideSvc",function(commonSvc){
  var service = {
    getAllByArticleId: getAllByArticleId,
    saveNewSlide: saveNewSlide,
    saveNewSubslide: saveNewSubslide
  };
  return service;

  function getAllByArticleId(id) {
    var url=String.format("/api/articles/{0}/slides", id);
    return commonSvc.get(url);
  }

  function saveNewSlide(articleId, slideId, side) {
    var url=String.format("/api/articles/{0}/slides/{1}?sideIndex={2}", articleId, slideId, side);
    return commonSvc.post(url);
  }

  function saveNewSubslide(articleId, slideId, subslideId, side) {
    var url = String.format("/api/articles/{0}/slides/{1}/subslides/{2}?sideIndex={3}", articleId, slideId, subslideId, side);
    return commonSvc.post(url);
  }
});
