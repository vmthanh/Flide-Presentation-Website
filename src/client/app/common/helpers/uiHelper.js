'use strict';

angular.module('flideApp').factory('uiHelper',function(){
  var service = {
    getText:getText
  };
  return service;

  function getText(dom) {
    if (!dom) {
      return String.empty;
    }
    if (dom.innerText) {
      return dom.innerText;
    }
    if (dom.textContent) {
      return dom.textContent;
    }
    return String.empty;
  }
});
