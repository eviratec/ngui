
  angular.module('DataStudioWebui.Anon')
    .controller('SignupController', SignupController);

  SignupController.$inject = ['$scope', '$signup', '$mdDialog'];
  function SignupController (  $scope,   $signup,   $mdDialog) {

    $scope.error = '';

    $scope.newUser = {
      EmailAddress: '',
      Password: '',
    };

    $scope.onSubmit = function ($ev) {

      $ev.preventDefault();

      let Email = $scope.newUser.EmailAddress;
      let Password = $scope.newUser.Password;

      $signup(Email, Password)
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
