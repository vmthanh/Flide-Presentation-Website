'use strict';

angular.module("flideApp").controller('themeCtrl', ThemeCtrl);

ThemeCtrl.$inject = ['$scope', '$state', '$stateParams'];
function ThemeCtrl($scope, $state, $stateParams) {
	init();

	function init() {
		if (Reveal.isInitialized) {
			Reveal.slide($stateParams.slideId - 1, $stateParams.subslideId);
		}
	}
}
