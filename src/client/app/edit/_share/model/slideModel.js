'use strict';

angular.module("flideApp").factory('slideModel', ['subslideModel', function(subslideModel) {
    var factory = {
        create: create
    };
    return factory;

    function create(slideDataItem) {
        return new Slide(slideDataItem);

        function Slide(dataItem) {
            var vm = this;
            vm.slideId = 0;
            vm.subSlides = [];
            vm.loadDataFrom = loadDataFrom;

            if (dataItem) {
                vm.loadDataFrom(dataItem);
            }

            function loadDataFrom(dataItem) {
                vm.slideId = dataItem.slideId;
                /*vm.header = new GraggableContent(dataItem.header);
                vm.subHeader = dataItem.subHeader;*/
                if (dataItem.subSlides && dataItem.subSlides.length > 0) {
                    dataItem.subSlides.forEach(function(subSlide) {
                        vm.subSlides.push(subslideModel.create(subSlide));
                    });
                }
            }

        }
    }
}]);
