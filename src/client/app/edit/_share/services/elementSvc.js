'use strict';

angular.module('flideApp').factory("elementSvc", function(commonSvc) {
  var service = {
    updateElement: updateElement,
    addElement: addElement,
    deleteElement: deleteElement,
  };
  return service;

  function updateElement(articleId, slideId, subslideId, elementId, element) {
    var url = String.format("/api/articles/{0}/slides/{1}/subslides/{2}/elements/{3}", articleId, slideId, subslideId, elementId);
    return commonSvc.put(url, element);
  }

  function addElement(articleId,slideId,subslideId,element){
  	var url = String.format("/api/articles/{0}/slides/{1}/subslides/{2}/elements",articleId,slideId,subslideId);
  	return commonSvc.post(url,element);
  }


  function deleteElement(articleId, slideId, subslideId, elementId) {
    var url = String.format("/api/articles/{0}/slides/{1}/subslides/{2}/elements/{3}", articleId, slideId, subslideId, elementId);
    return commonSvc.delete(url);
  }
});
