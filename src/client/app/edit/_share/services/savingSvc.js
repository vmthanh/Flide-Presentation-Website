'use strict';

angular.module('flideApp').factory("savingSvc", function() {
  var isSaving = null;
  return { isSaving: isSaving };
});
