
  angular.module('DataStudioWebui')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope'];
  function LoginController (  $scope) {

    $scope.credentials = {
      Login: '',
      Password: '',
    };

    $scope.onSubmit = function ($ev) {

      $ev.preventDefault();

    };

  };
