
  angular.module('DataStudioWebui.Anon')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope', '$auth', '$state', '$login', '$timeout'];
  function LoginController (  $scope,   $auth,   $state,   $login,   $timeout) {

    // $user.on('login', () => {
    //   $state.go('app.user.dashboard');
    // });

    $scope.error = '';

    $scope.credentials = {
      Login: '',
      Password: '',
    };

    $scope.onSubmit = function ($ev) {

      $ev.preventDefault();

      console.log($ev);

      let Login = $scope.credentials.Login;
      let Password = $scope.credentials.Password;

      $login(Login, Password)
        .catch((err) => {
          $timeout(function () {
            $scope.error = err.message;
          });
        });

    };

  };
