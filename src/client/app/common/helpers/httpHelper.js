'use strict';

angular.module('flideApp').factory('httpHelper',function(){
  var httpStatusCode={
    ok:200,
    created: 201,
    notFound:404
  };

  var helper = {
    isErrorResponse:isErrorResponse
  };
  return helper;

  function isErrorResponse(response){
    return response && !isSuccessHttpCode(response.status);
  }

  function isSuccessHttpCode(code){
    return (code === httpStatusCode.ok) || (code === httpStatusCode.created);
  }
});
