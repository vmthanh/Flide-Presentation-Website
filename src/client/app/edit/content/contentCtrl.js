'use strict';

angular.module("flideApp").controller('contentCtrl', ContentCtrl);

ContentCtrl.$inject = ['$scope', '$stateParams', 'elementSvc', 'savingSvc', 'elementModel'];

function ContentCtrl($scope, $stateParams, elementSvc, savingSvc, elementModel) {
	var self = this;
	self.isHaveTitle = false;
	self.activeToolbarItem = -1;
	init();

	function init() {
		if (Reveal.isInitialized) {
			Reveal.slide($stateParams.slideId - 1, $stateParams.subslideId);
			self.isHaveTitle = true;
		}
	}

	self.addTitle = function(currentSubSlide) {
		if (currentSubSlide.elements.length === 0 || currentSubSlide.elements[0].typeE  !== "header")
		{
			var newTitle = {
				typeE:"header",
				detail:{
					content:"<span style=\"font-size:48px;\">The Title</span>",
					left:0,
					top:50,
					width:"100",
					height:"20",
					mode:"fix",
					style:{
						"font-family": "ProximaNova",                            
                        "color": "black",
                        "cursor": "move"
					},
					cssClass:".slide-element"

				}
			};
			Reveal.slide(Reveal.getIndices().h,Reveal.getIndices().v);
			self.addNewElement(newTitle,function(result){
				if (result.status ===201){
					var newElement = elementModel.create(result.data);
					currentSubSlide.elements.unshift(newElement);
					console.log(currentSubSlide.elements);
				}else{
					console.log("Error when adding new Title");
				}
			});
		}else{
			return;
		}		
	};

	self.addSubtitle = function(currentSubSlide) {
		var newSubTitle = {
			typeE: "subHeader",
			detail: {
				content: "<span style=\"font-size:48px;\"> New subtitle</span>",
				top: "110px",
				left: "0px",
				style:{
					"font-family": "ProximaNovaLight",
					"color": "black",
					"cursor": "move"
				},
			}
		};
		
		Reveal.slide(Reveal.getIndices().h, Reveal.getIndices().v);
		self.addNewElement(newSubTitle, function(result) {
			if (result.status === 201) {
				
				var newElement = elementModel.create(result.data);
				currentSubSlide.elements.push(newElement);

			} else {
				console.log("Error when adding new element");
			}
		});


	};

	self.addNewElement = function(element, callback) {
		savingSvc.isSaving = true;
		elementSvc.addElement($stateParams.articleId, Reveal.getIndices().h, Reveal.getIndices().v, element).success(function(data) {
			setTimeout(function() {
					savingSvc.isSaving = false;
					$scope.$apply();
				}, 500);
			callback(data);
		}).fail(function(error) {
			console.log(error);
		});
	};

	self.addNewTitle = function(title,callback){
		savingSvc.isSaving = true;
		elementSvc.addTitle($stateParams.articleId,Reveal.getIndices().h,Reveal.getIndices().v,element).success(function(data){
			setTimeout(function(){
				savingSvc.isSaving = false;
				$scope.$apply();
			},500);
			callback(data);
		}).fail(function(error){
			console.log(error);
		});
	};

	self.saveElementChanges = function(elementId, element) {
		savingSvc.isSaving = true;
		elementSvc.updateElement($stateParams.articleId, Reveal.getIndices().h, Reveal.getIndices().v, elementId, element)
		.success(function() {
			setTimeout(function() {
				savingSvc.isSaving = false;
				$scope.$apply();
			}, 500);
			self.saved = true;
			console.log('Element saved.');
		});
	};

	self.moveToSubSlide = function(slideId,subslideId)
	{
		Reveal.slide(slideId, subslideId);
	};

	self.editTitle = function(slideId, subslideId) {
		self.activeToolbarItem = 2;
		Reveal.slide(slideId, subslideId);

	};

	self.editSubtitle = function(slideId, subslideId) {
		self.activeToolbarItem = 3;
		Reveal.slide(slideId, subslideId);
	};
}
