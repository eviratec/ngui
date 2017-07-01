
  angular.module('DataStudioWebui')
    .controller('AnonController', AnonController);

  AnonController.$inject = ['$scope'];
  function AnonController (  $scope) {

    this.test = 'Meow';

  };
