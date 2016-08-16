'use strict';

angular.module("flideApp").factory('elementModel', function() {
    var factory = {
        create: create
    };
    return factory;

    function create(dataItem) {
        function Element(dataItem) {
            var vm = this;
            vm.elementId = 0;
            vm.typeE = "";
            vm.detail = new GraggableContent(null);
            vm.loadDataFrom = loadDataFrom;
            if (dataItem) {
                vm.loadDataFrom(dataItem);
            }

            function loadDataFrom(dataItem) {
                vm.elementId = dataItem.elementId;
                vm.typeE = dataItem.typeE;
                vm.detail = new GraggableContent(dataItem.detail);
            }

            function GraggableContent(options) {
                options = options || {};
                var self = this;
                self.left = options.left || 0;
                self.top = options.top || 0;
                self.width = options.width || "";
                self.height = options.height || "";
                self.mode = options.mode || "fix";
                self.style = options.style || "";
                self.content = options.content || "";
                self.cssClass = options.cssClass || "";
            }
        }

        return new Element(dataItem);
    }
});
