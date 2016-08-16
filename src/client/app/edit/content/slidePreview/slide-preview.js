'use strict';
angular.module('flideApp').directive('slidePreview', [function() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: false,
        templateUrl: 'app/edit/content/slidePreview/slidePreview.html',
        link: function(scope, element) {
            if (Reveal.isAddingSlide || Reveal.isAddingSubslide) {
                $('.scroller').animate({
                    scrollTop: $('.scroller').scrollTop() + element.offset().top - $('.scroller').offset().top -20
                });
                Reveal.isAddingSlide = false;
                Reveal.isAddingSubslide = false;
            }
        }
    };
}]);
