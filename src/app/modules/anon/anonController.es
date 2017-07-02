
  angular.module('DataStudioWebui.Anon')
    .controller('AnonController', AnonController);

  AnonController.$inject = ['$rootScope', '$state', '$auth'];
  function AnonController (  $rootScope,   $state,   $auth) {

    $rootScope.$on('authorized', () => {
      $state.go('app.user.dashboard');
    });

    if ($auth.isAuthorized) {
      $state.go('app.user.dashboard');
    }

  };
