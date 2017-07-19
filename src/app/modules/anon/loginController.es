
  angular.module('DataStudioWebui.Anon')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope', '$auth', '$state', '$mdDialog', '$login', '$timeout'];
  function LoginController (  $scope,   $auth,   $state,   $mdDialog,   $login,   $timeout) {

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
          let errorMsg = err.data.ErrorMsg.match(/^([A-Z_]+)\:\s(.*)$/);

          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.body))
              .clickOutsideToClose(true)
              .title(errorMsg[2])
              .textContent(errorMsg[1])
              .ariaLabel('Login error dialog')
              .ok('Got it!')
              .targetEvent($ev)
          );

          $timeout(function () {
            $scope.error = errorMsg[2];
          });
        });

    };

  };
