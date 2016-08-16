'use strict';

angular.module('flideApp').directive('slideDetail', [function() {
    return {
        restrict: 'EA',
        scope: {
            model: '=',
            parent: "@"
        },
        replace: true,
        transclude: true,
        controller: 'slideCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/edit/_share/directives/rightPanel/slide/slide.html',
        link: function() {

        }
    };
}]);
