
  angular.module('DataStudioWebui.AppUser')
    .controller('AppUserController', AppUserController);

  AppUserController.$inject = ['$scope'];
  function AppUserController (  $scope) {

    this.test = 'Meow';

  };
