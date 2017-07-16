
  angular.module('DataStudioWebui.Anon')
    .controller('SignupController', SignupController);

  SignupController.$inject = ['$state', '$scope', '$signup', '$timeout', '$mdDialog'];
  function SignupController (  $state,   $scope,   $signup,   $timeout,   $mdDialog) {

    disableSignup();

    $scope.error = '';
    $scope.signupEnabled = true;

    $scope.showProgress = false;

    $scope.newUser = {
      EmailAddress: '',
      Password: '',
    };

    enableSignup();

    $scope.onSubmit = function ($ev) {

      disableSignup();

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

          let d = $mdDialog.alert()
            .parent(angular.element(document.body))
            .clickOutsideToClose(true)
            .title('Signup failed')
            .textContent(errorMsg)
            .ariaLabel('Signup error notification')
            .ok('Got it!')
            .targetEvent($ev);

          $mdDialog.show(d).then(() => {
            enableSignup();
          });

          $timeout(function () {
            $scope.error = errorMsg[2];
          });
        });

    };

    function enableSignup () {
      $scope.signupEnabled = true;
    }

    function disableSignup () {
      $scope.signupEnabled = false;
    }

    function showProgressBar () {
      $scope.showProgress = true;
    }

    function hideProgressBar () {
      $scope.showProgress = false;
    }

  };
