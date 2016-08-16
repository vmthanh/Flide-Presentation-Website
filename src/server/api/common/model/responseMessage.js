  var factory={
    create:create
  };
  module.exports = factory;
  function create() {
    return new ResponseMessage();

    function ResponseMessage() {
      var vm = this;
      vm.data = {};
      vm.status = 200;
      //will refactor later
      vm.errors = [];

      vm.setData = setData;
      vm.setStatus = setStatus;
      vm.addError = addError;
      vm.toJson = toJson;

      function toJson() {
        return {
          status: vm.status,
          data: vm.data,
          errors: vm.errors
        };
      }

      function addError(error) {
        vm.errors.push(error);
      }

      function setStatus(responseStatus) {
        vm.status = responseStatus;
      }

      function setData(responseData) {
        vm.data = responseData;
      }
    }
  }
