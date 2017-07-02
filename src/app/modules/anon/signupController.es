
  angular.module('DataStudioWebui.Anon')
    .controller('SignupController', SignupController);

  SignupController.$inject = ['$scope'];
  function SignupController (  $scope) {

    $scope.credentials = {
      Login: '',
      Password: '',
    };

    $scope.onSubmit = function ($ev) {

      $ev.preventDefault();

    };

  };
