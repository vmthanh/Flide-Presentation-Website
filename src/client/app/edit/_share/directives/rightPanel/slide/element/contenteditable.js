'use strict';

angular.module('flideApp').directive('contenteditable', function() {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel) {
            if (!ngModel) {
                return;
            }
            
            var lastColor;
            var lastFontsize;

            ngModel.$render = function() {
                element.html(ngModel.$viewValue || '');
            };

            element.on('blur keyup', function() {
                var eventTarget = document.getSelection().anchorNode.parentNode;
                changeColorForColorButton(eventTarget);
                getFontsize(eventTarget);                      
                scope.$apply(readViewText);
            });
                                   
            element.on('mouseup', function(event){
                changeColorForColorButton(event.target);
            });
            
            function readViewText() {
                var html = element.html();
                var htmlStr = html.toString();                                
                if (htmlStr.indexOf('<span') === -1 && htmlStr.indexOf('</span>') === -1){                                                     
                    var colorSpan = '<span style=\"color:'+lastColor+';\"><br></span>';
                    var fontsizeSpan = document.createElement("span");
                    var style = 'font-size: ' + lastFontsize + ';';
                    fontsizeSpan.setAttribute('style',style);
                    fontsizeSpan.innerHTML = colorSpan;                    
                    element.children().html(fontsizeSpan);       
                                                                                                                                         
                    var el = $(element).find('span')[1];
                    var range = document.createRange();
                    var sel = window.getSelection();                    
                    range.setStart(el,0);              
                    range.collapse(true);           
                    sel.removeAllRanges();
                    sel.addRange(range);                                   
                    el.focus();                    
                }              
                html = html.replace(/&nbsp;/g, '');
                if (attrs.stripBr && html === '<br>') {
                    html = '';
                }
                ngModel.$setViewValue(html);
            }                        
            
            function getFontsize(eventTarget){
                var fontsize = "px";
                var ele = eventTarget;
                while (true){
                    if ($(ele).is('span') === false)
                    {
                        return;
                    }
                    var style = ele.attributes.style.value;
                    var stopLoop = false;
                    var pos = style.indexOf('px');                                        
                    if (pos > -1)
                    {                        
                        var i = 1;
                        while (style[pos-i] >= '0' && style[pos-i] <= '9')
                        {
                            fontsize = style[pos-i] + fontsize;
                            i = i + 1;
                        }
                        lastFontsize = fontsize;                        
                        stopLoop = true;
                    }
                    if (stopLoop === true)
                    {
                        break;
                    }
                    ele = ele.parentElement;
                } 
            }
            
            
            function changeColorForColorButton(eventTarget){                                
                var color = "";
                var ele = eventTarget;
                while (true){   
                    if ($(ele).is('p') || $(ele).is('div'))
                    {
                        $('.cke_button__textcolor_icon').css('background-color','#000000');
                        break;
                    }                                                    
                    var style;
                    if ($(ele).is('font')){
                        style = 'color:'+ $(ele).css('color');                        
                    }
                    else{
                        style = ele.attributes.style.value;
                    }                  
                    var stopLoop = false;
                    var pos = style.indexOf('color:');                    
                    if (pos > -1)
                    {
                        pos = pos + 6;
                        if (style[pos]) {
                            while (style[pos] !== ';')
                            {
                                color = color + style[pos];
                                pos = pos + 1;
                                if (pos >= style.length){
                                    break;
                                }                      
                            }
                        }
                        $('.cke_button__textcolor_icon').css('background-color',color);
                        lastColor = color;                            
                        stopLoop = true;                             
                    }                    
                    if (stopLoop === true)
                    {
                        break;
                    }
                    ele = ele.parentElement;                     
                }
            }
        }
    };
});
