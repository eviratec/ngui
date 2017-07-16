
  angular.module('DataStudioWebui.Anon')
    .controller('SignupController', SignupController);

  SignupController.$inject = ['$state', '$scope', '$signup', '$timeout', '$mdDialog'];
  function SignupController (  $state,   $scope,   $signup,   $timeout,   $mdDialog) {

    $scope.error = '';

    $scope.showProgress = false;

    $scope.newUser = {
      EmailAddress: '',
      Password: '',
    };

    $scope.onSubmit = function ($ev) {

      $ev.preventDefault();

      showProgressBar();

      let Email = $scope.newUser.EmailAddress;
      let Password = $scope.newUser.Password;

      $signup(Email, Password)
        .then(() => {
          let d = $mdDialog.alert()
            .parent(angular.element(document.body))
            .clickOutsideToClose(true)
            .title('Success!')
            .textContent('Your account has been created')
            .ariaLabel('Signup success notification')
            .ok('Awesome!')
            .targetEvent($ev);
          $mdDialog.show(d).then(() => {
            $state.go('app.anon.login');
          });
        })
        .catch((errorMsg) => {
          hideProgressBar();

          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.body))
              .clickOutsideToClose(true)
              .title('Signup failed')
              .textContent(errorMsg)
              .ariaLabel('Signup error notification')
              .ok('Got it!')
              .targetEvent($ev)
          );

          $timeout(function () {
            $scope.error = errorMsg[2];
          });
        });

    };

    function showProgressBar () {
      $scope.showProgress = true;
    }

    function hideProgressBar () {
      $scope.showProgress = false;
    }

  };
