'use strict';

angular.module('flideApp').factory('errorHelper',function(){
  var helper = {
    createGenericError:createGenericError
  };
  return helper;
  
  function createGenericError(){
    /*
    Will be updated to return errorFactory.create later
    and retrive resource from locales
    * */
    return {key:'GenericError',message:'Generic error. Please contract your administrator for more information.'};
  }
});
