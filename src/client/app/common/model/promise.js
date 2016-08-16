'use strict';

angular.module('flideApp').factory('promiseFactory',function(){
  var factory = {
    create: create
  };
  return factory;

  function create() {
    return new PromiseConstructor();
    function PromiseConstructor() {
      
      var promiseStatus = {none: 'none', success: 'success', fail: 'fail'};
      var result = null, status = promiseStatus.none, error = null;
      var callback = {
        success: System.emptyFn,
        fail: System.emptyFn,
        always: System.emptyFn
      };

      var promise = {
        always: always,
        then: then,
        resolve: resolve,
        reject: reject,
        fail: fail,
        success: success
      };
      return promise;
      function reject(errorObj, data) {
        result = data;
        error = errorObj;
        status = promiseStatus.fail;
        return processCallback();
      }

      function resolve(data) {
        result = data;
        status = promiseStatus.success;
        return processCallback();
      }

      function processCallback() {
        if (status === promiseStatus.none) {
          return promise;
        }
        if (status === promiseStatus.success && callback.success) {
          callback.success(result);
        }

        if (status === promiseStatus.fail && callback.fail) {
          callback.fail(error, result);
        }

        if (callback.always) {
          callback.always(result, status, error);
        }
        return promise;
      }

      function fail(failCallback) {
        if (failCallback) {
          callback.fail = failCallback;
        }
        return processCallback();
      }

      function success(successCallback) {
        if (successCallback) {
          callback.success = successCallback;
        }
        return processCallback();
      }

      function then(successCallback, failCallback) {
        if (successCallback) {
          callback.success = successCallback;
        }

        if (failCallback) {
          callback.fail = failCallback;
        }
        return processCallback();
      }

      function always(callback) {
        if (callback) {
          callback.always = callback;
        }
        return processCallback();
      }
    }
  }
});