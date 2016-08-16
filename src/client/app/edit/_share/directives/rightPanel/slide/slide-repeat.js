'use strict';

angular.module('flideApp')
.directive('slideRepeat', ['$state', function ($state) {
    return function (scope, element) {
        if (Reveal.isAddingSlide) {
            var nextSlide = element.next();
            if (nextSlide.length && nextSlide.hasClass('present')) {
                element.addClass('past');
                Reveal.right();
                Reveal.left();
            } else {
                element.addClass('future');
                Reveal.right();
            }
            //Reveal.isAddingSlide = false;
        }

        if (Reveal.isAddingSubslide) {
            var nextSubslide = element.next();
            if (nextSubslide.length && nextSubslide.hasClass('present')) {
                element.addClass('past');
                Reveal.next();
                Reveal.up();
            } else {
                element.addClass('future');
                Reveal.down();
            }
            //Reveal.isAddingSubslide = false;
        }

        if (scope.$last && !Reveal.isInitialized && !Reveal.isSlideInitialized) {
            Reveal.isSlideInitialized = true;
        } else if (scope.$last && !Reveal.isInitialized && Reveal.isSlideInitialized) {
            initSlider();
            initEditor();
            $state.go('edit.content', {slideId: 1, subslideId: 0});
        }
    };
}]);

function initSlider() {
    Reveal.initialize({
        controls: true,
        progress: false,
        history: true,
        center: false,
        overview: true,

        transition: 'slide',

        dependencies: [
            {
                src: 'assets/js/classList.js', condition: function () {
                    return !document.body.classList;
                }
            },
            {
                src: 'assets/js/plugin/markdown/marked.js', condition: function () {
                    return !!document.querySelector('[data-markdown]');
                }
            },
            {
                src: 'assets/js/plugin/markdown/markdown.js', condition: function () {
                    return !!document.querySelector('[data-markdown]');
                }
            },
            {
                src: 'assets/js/plugin/highlight/highlight.js', async: true, callback: function () {
                    hljs.initHighlightingOnLoad();
                }
            },
            {
                src: 'assets/js/plugin/zoom-js/zoom.js', async: true, condition: function () {
                    return !!document.body.classList;
                }
            }
        ]
    });

    Reveal.isInitialized = true;
    Reveal.isAddingSlide = false;
    Reveal.isAddingSubslide = false;

    appendSquareIcon();
}

function initEditor() {
}

function appendSquareIcon() {
    var squareImg = document.createElement('img');
    squareImg.setAttribute("class", "square-icon");
    squareImg.setAttribute("src", "./assets/css/app/images/content-editor/presentation/square.png");
    document.querySelector('aside.controls').appendChild(squareImg);
}