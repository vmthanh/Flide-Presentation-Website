'use strict';

angular.module("flideApp").controller('elementCtrl', ElementCtrl);

ElementCtrl.$inject = ['$window', '$stateParams', 'elementSvc', 'savingSvc', '$scope', '$element'];

function ElementCtrl($window, $stateParams, elementSvc, savingSvc, $scope, $element) {
    var vm = this;
    angular.extend(vm, $scope);
    vm.elementStyle = {};
    vm.elementHandlers = {};
    vm.isChosen = false;
    vm.borderFocusIn = borderFocusIn;
    vm.borderForcusOut = borderForcusOut;
    vm.onDragging = onDragging;
    vm.onDrag = onDrag;
    vm.onDragged = onDragged;
    vm.oldContent = vm.model.detail.content;

    function borderFocusIn() {
        vm.isChosen = true;

        vm.model.detail.style.cursor = "text";

        vm.oldContent = vm.model.detail.content;
    }

    function borderForcusOut(elementId) {
        vm.isChosen = false;
        
        vm.model.detail.style.cursor = "move";

        if (vm.oldContent !== vm.model.detail.content) {
            saveElementChanges(elementId);
            vm.oldContent = vm.model.detail.content;
        }
    }

    function saveElementChanges(elementId) {

        savingSvc.isSaving = true;
        elementSvc.updateElement($stateParams.articleId, Reveal.getIndices().h, Reveal.getIndices().v, elementId, vm.model)
        .success(function() {
            setTimeout(function() {
                savingSvc.isSaving = false;
                $scope.$apply();
            }, 500);

        });
    }

    function onDrag() {
    }

    function onDragging() {
    }

    function onDragged() {
        var elementStyle = $window.getComputedStyle($element[0], null);
        vm.model.detail.top = elementStyle.top;
        vm.model.detail.left = elementStyle.left;
        saveElementChanges(vm.$parent.$index);
    }

}