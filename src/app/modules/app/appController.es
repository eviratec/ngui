
  angular.module('DataStudioWebui')
    .controller('AppController', AppController);

  AppController.$inject = ['$scope', '$auth'];
  function AppController (  $scope,   $auth) {

    this.test = 'Meow';

    console.log($auth);

  };
