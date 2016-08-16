'use strict';

angular.module('flideApp').directive('element', ['$stateParams', 'elementSvc', 'savingSvc', function($stateParams, elementSvc, savingSvc) {
    return {
        restrict: 'EA',
        scope: {
            model: '=',
            parent: "@"
        },
        replace: true,
        transclude: true,
        controller: 'elementCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/edit/_share/directives/rightPanel/slide/element/element.html',
        link: function(scope, element) {

            $('html').click(function() {
                /*$(element).draggable('enable');
                $('.slide-element').attr('contenteditable','false');
                if (scope.vm.oldContent !== scope.vm.model.detail.content) {
                    saveElementChanges();
                    scope.vm.oldContent = scope.vm.model.detail.content;
                    console.log('Element saved');
                }*/
            });

            $(element)
            .draggable({
                start: scope.vm.onDrag,
                drag: scope.vm.onDragging,
                stop: scope.vm.onDragged,
            })
            .click(function(event) {
                event.stopPropagation();
                $(this).draggable('disable');
                $('.slide-element').attr('contenteditable','true');
                $($(this).find("div")[1]).trigger("focus");
                scope.$apply();
            });

            window.setTimeout(function() {
                var editor = CKEDITOR.inline($(element).find("div")[1], {
                    floatSpaceDockedOffsetX: 10,
                    floatSpaceDockedOffsetY: 50,
                });                                
                
                editor.on('instanceReady', function(event) {
                    event.editor.setReadOnly(false);
                    $('.slide-element').attr('contenteditable','false');                   
                });

                editor.on('blur', function() {
                    $(element).draggable('enable');
                    $('.slide-element').attr('contenteditable','false');
                    if (scope.vm.oldContent !== scope.vm.model.detail.content) {
                        saveElementChanges();
                        scope.vm.oldContent = scope.vm.model.detail.content;
                    }
                });

                editor.on('focus', function(event) {
                    if (event.sender.element.getStyle('font-family') === 'ProximaNova') {
                        $('.cke_button__head1_icon').css('background-color', '#ff6f3b');
                        $('.cke_button__head2_icon').css('background-color', '#363636');
                    } else {
                        $('.cke_button__head2_icon').css('background-color', '#ff6f3b');
                        $('.cke_button__head1_icon').css('background-color', '#363636');
                    }
                });

                editor.addCommand('head1',{
                    exec: function(){
                        scope.vm.model.detail.style['font-family'] = 'ProximaNova';
                        scope.$apply();
                        saveElementChanges();
                        $('.cke_button__head1_icon').css('background-color', '#ff6f3b');
                        $('.cke_button__head2_icon').css('background-color', '#363636'); 
                    }      
                });
                
                editor.addCommand('head2', {
                    exec: function(){
                        scope.vm.model.detail.style['font-family'] = 'ProximaNovaLight';
                        scope.$apply();
                        saveElementChanges();      
                        $('.cke_button__head1_icon').css('background-color', '#363636');
                        $('.cke_button__head2_icon').css('background-color', '#ff6f3b');        
                    }
                });

                editor.addCommand('delete',{
                    exec: function(){                       
                        deleteElement();
                        editor.destroy();
                    }
                });

                editor.leftAlign = function() {
                    scope.vm.model.detail.style['text-align'] = 'left';
                    scope.$apply();
                    saveElementChanges();
                };

                editor.centerAlign = function() {
                    scope.vm.model.detail.style['text-align'] = 'center';
                    scope.$apply();
                    saveElementChanges();
                };

                editor.rightAlign = function() {
                    scope.vm.model.detail.style['text-align'] = 'right';
                    scope.$apply();
                    saveElementChanges();
                };

                editor.justifyAlign = function() {
                    scope.vm.model.detail.style['text-align'] = 'justify';
                    scope.$apply();
                    saveElementChanges();
                };

            }, 1000);

            function saveElementChanges() {
                savingSvc.isSaving = true;
                elementSvc.updateElement($stateParams.articleId, Reveal.getIndices().h, Reveal.getIndices().v, scope.$parent.$index, scope.vm.model)
                .success(function() {
                    setTimeout(function() {
                        savingSvc.isSaving = false;
                        scope.$apply();
                    }, 500);

                });
            }

            function deleteElement() {
                savingSvc.isSaving = true;
                elementSvc.deleteElement($stateParams.articleId, Reveal.getIndices().h, Reveal.getIndices().v, scope.$parent.$index)
                    .success(function() {
                        setTimeout(function() {
                            savingSvc.isSaving = false;
                            scope.$apply();
                        }, 500);
                        scope.$parent.model.subSlides[Reveal.getIndices().v].elements.splice(scope.$parent.$index, 1);
                        //scope.$parent.model.elements.splice(scope.$parent.$index, 1);
                    })
                    .fail(function() {
                        console.log("Delete failed!");
                    });
            }
        }
    };
}]);

