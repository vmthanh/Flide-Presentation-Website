'use strict';

angular.module("flideApp").factory('subslideModel', ['elementModel', function(elementModel) {
    var factory = {
        create: create
    };
    return factory;

    function create(dataItem) {
        return new Subslide(dataItem);

        function Subslide(dataItem) {
            var vm = this;
            vm.subSlideId = 0;
            vm.note = "";
            vm.elements = [];
            vm.loadDataFrom = loadDataFrom;
            if (dataItem) {
                vm.loadDataFrom(dataItem);
            }

            function loadDataFrom(dataItem) {
                vm.subSlideId = dataItem.subSlideId;
                vm.note = dataItem.note;
                if (dataItem.elements && dataItem.elements.length > 0) {
                    dataItem.elements.forEach(function(element) {
                        vm.elements.push(elementModel.create(element));
                    });
                }
            }
        }
    }
}]);
