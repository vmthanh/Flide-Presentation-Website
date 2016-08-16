'use strict';

angular.module("flideApp").controller('slideCtrl', SlideCtrl);

SlideCtrl.$inject = ['$scope'];

function SlideCtrl($scope) {
	var vm = this;
	angular.extend(vm, $scope);
	vm.isSlide = isSlide;

	function isSlide() {
		if (vm.model.subSlides) {
			return true;
		} else {
			return false;
		}
	}
}
