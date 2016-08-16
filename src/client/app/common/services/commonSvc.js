'use strict';

angular.module('flideApp').factory('commonSvc',['$http','httpHelper', 'errorHelper','promiseFactory',function(http, httpHelper, errorHelper, promiseFactory){
  var service = {
    get:get,
    post:post,
    put:put,
    delete:deletes
  };
  return service;

  function get(url){
    var def = promiseFactory.create();
    http.get(url).
      success(function(response) {
        if(!response || httpHelper.isErrorResponse(response)){
          def.reject(response.errors);
        }else{
          def.resolve(response.data);
        }
      }).
      error(function() {
        def.reject(errorHelper.createGenericError());
      });
    return def;
  }

  function post(url,data){
    var def = promiseFactory.create();
    http.post(url,data).
      success(function(response) {
        if(!response || httpHelper.isErrorResponse(response)){
          def.reject(response.errors);
        }else{
          def.resolve(response);
        }
      }).
      error(function() {
        def.reject(errorHelper.createGenericError());
      });
    return def;
  }

  function put(url, data){
    var def = promiseFactory.create();
    http.put(url, data).
      success(function(response) {
        if(!response || httpHelper.isErrorResponse(response)){
          def.reject(response.errors);
        }else{
          def.resolve(response.data);
        }
      }).
      error(function() {
        def.reject(errorHelper.createGenericError());
      });
    return def;
  }

  function deletes(url){
    var def = promiseFactory.create();
    http.delete(url).
      success(function(response) {
        if(!response || httpHelper.isErrorResponse(response)){
          def.reject(response.errors);
        }else{
          def.resolve(response.data);
        }
      }).
      error(function() {
        def.reject(errorHelper.createGenericError());
      });
    return def;
  }
}]);
