'use strict';

angular.module("flideApp").controller('styleCtrl', StyleCtrl);

StyleCtrl.$inject = ['$scope', '$state', '$stateParams'];
function StyleCtrl($scope, $state, $stateParams) {
	init();

	function init() {
		if (Reveal.isInitialized) {
			Reveal.slide($stateParams.slideId - 1, $stateParams.subslideId);
		}
	}
}
