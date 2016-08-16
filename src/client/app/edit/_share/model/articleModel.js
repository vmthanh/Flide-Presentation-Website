'use strict';

angular.module("flideApp").factory('articleModel', ['slideModel',function(slideModel){
  var factory = {
    create: create
  };
  return factory;

  function create() {
    return new Article();
    function Article() {
      var vm = this;
      vm.artcileNmae = "";
      vm.articleId=0;
      vm.slides = [];
      vm.importSlides = importSlides;
      vm.getSlide = getSlide;

      function getSlide(slideId) {
        var searchedSlide = searchFromSlideItem(slideId, vm.slides);
        return searchedSlide;
      }

      function searchFromSlideItem(slideId, slides) {
        for (var slideIndex = 0; slideIndex < slides.length; slideIndex++) {
          var item = slides[slideIndex];
          if (Number(item.slideId) === Number(slideId)) {
            return item;
          }
        }
        return null;
      }

      function importSlides(importedSlides) {
        vm.slides = [];
        if (!importedSlides) {
          return;
        }
        importedSlides.forEach(function (item) {
          vm.slides.push(slideModel.create(item));
        });
      }
    }
  }
}]);