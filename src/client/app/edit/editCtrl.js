'use strict';

angular.module("flideApp").controller('editCtrl', EditCtrl);

EditCtrl.$inject = ['$scope', '$state', '$stateParams', 'slideSvc', 'savingSvc', 'articleModel', 'slideModel', 'subslideModel'];

function EditCtrl($scope, $state, $stateParams, slideSvc, savingSvc, articleModel, slideModel, subslideModel) {
    var vm = this;
    vm.articleModel = articleModel.create();
    vm.articleModel.articleId = 0;
    vm.articleModel.currentSlide = slideModel.create();
    vm.articleModel.currentSubSlide = null;
    vm.articleModel.currentSlideId = 0;
    vm.articleModel.currentSubslideId = 0;
    vm.onInitialized = onInitialized;
    vm.onSaveClicked = onSaveClicked;
    vm.addNewSlideLeft = addNewSlideLeft;
    vm.addNewSlideRight = addNewSlideRight;
    vm.addNewSubslideUp = addNewSubslideUp;
    vm.addNewSubslideDown = addNewSubslideDown;
    vm.onInitialized();
    vm.isSaving = false;

    $scope.$watch(function() { return savingSvc.isSaving; }, function(isSaving) {
        vm.isSaving = isSaving;
    }, true);

    $scope.$on('$viewContentLoaded',function(){
        resizeDiv();
        Reveal.addEventListener('slidechanged', onSlideChanged);
    });
   
    function onSaveClicked() {
        console.log(vm.articleModel.currentSlide);
    }

    function onInitialized() {
        resizeDiv();

        if(Reveal.isInitialized) {
            Reveal.removeEventListeners();
        }

        vm.articleModel.articleId = $stateParams.articleId;

        slideSvc.getAllByArticleId(vm.articleModel.articleId)
        .success(function(article) {
            Reveal.isInitialized = false;
            Reveal.isSlideInitialized = false;

            vm.articleModel.importSlides(article[0].slides);
            vm.articleModel.currentSlide = vm.articleModel.slides[0];
            vm.articleModel.currentSubSlide = vm.articleModel.slides[0].subSlides[0];
            vm.articleModel.currentSlideId = 0;
            vm.articleModel.currentSubslideId = 0;
        })
        .fail(function(error) {
            console.log(error);
            $state.go('edit', {articleId: 0});
        });

        if ($state.current.name !== 'edit') {
            $state.go('edit', {
                articleId: vm.articleModel.articleId
            });
        }

    }

    function onSlideChanged(event) {
        var currentSlide = vm.articleModel.slides[event.indexh];
        vm.articleModel.currentSubSlide = currentSlide.subSlides[event.indexv];
        vm.articleModel.currentSlide = currentSlide;
        vm.articleModel.currentSlideId = event.indexh;
        vm.articleModel.currentSubslideId = event.indexv;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
        $state.go($state.current.name, {
            slideId: vm.articleModel.currentSlideId + 1,
            subslideId: vm.articleModel.currentSubslideId
        }, {
            notify: false
        });
    }

    function addNewSlideLeft() {

        saveNewSlide(Reveal.getIndices().h, 0, function(result) {
            if (result.status === 201) {
                var newSlide = slideModel.create(result.data);
                Reveal.isAddingSlide = true;
                vm.articleModel.slides.splice(Reveal.getIndices().h, 0, newSlide);
            }
        });

    }

    function addNewSlideRight() {

        saveNewSlide(Reveal.getIndices().h, 1, function(result) {
            if (result.status === 201) {
                var newSlide = slideModel.create(result.data);
                Reveal.isAddingSlide = true;
                vm.articleModel.slides.splice(Reveal.getIndices().h + 1, 0, newSlide);
            }
        });

    }


    function addNewSubslideUp() {

        saveNewSubslide(Reveal.getIndices().h, Reveal.getIndices().v, 0, function(result) {
            if (result.status === 201) {
                var newSubslide = subslideModel.create(result.data);
                Reveal.isAddingSubslide = true;
                vm.articleModel.currentSlide.subSlides.splice(Reveal.getIndices().v, 0, newSubslide);
            }
        });

    }

    function addNewSubslideDown() {

        saveNewSubslide(Reveal.getIndices().h, Reveal.getIndices().v, 1, function(result) {
            if (result.status === 201) {
                var newSubslide = subslideModel.create(result.data);
                Reveal.isAddingSubslide = true;
                vm.articleModel.currentSlide.subSlides.splice(Reveal.getIndices().v + 1, 0, newSubslide);
            }
        });

    }

    function saveNewSlide(slideId, side, callback) {
        vm.isSaving = true;
        slideSvc.saveNewSlide(vm.articleModel.articleId, slideId, side).success(function(data) {
            setTimeout(function() {
                vm.isSaving = false;
                $scope.$apply();
            }, 500);
            callback(data);
        })
        .fail(function(error) {
            console.log(error);
        });

    }

    function saveNewSubslide(slideId, subslideId, side, callback) {
        vm.isSaving = true;
        slideSvc.saveNewSubslide(vm.articleModel.articleId, slideId, subslideId, side).success(function(data) {
            setTimeout(function() {
                vm.isSaving = false;
                $scope.$apply();
            }, 500);
            callback(data);
        })
        .fail(function(error) {
            console.log(error);
        });
    }

}

window.onresize = function() {
    resizeDiv();
};

function resizeDiv() {
    var hwindow = $(window).height();
    var hnavbar = $(".header").css('height');
    var hdiv = parseInt(hwindow) - parseInt(hnavbar);

    var height = hdiv - 85;
    height = height.toString();
    hdiv = hdiv.toString();
    $("#presentation").css({
        'height': hdiv + 'px'
    });

    $('.scroller').css({
        'height': height + 'px'
    });
}
