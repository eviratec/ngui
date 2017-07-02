
  angular.module('DataStudioWebui.Anon')
    .controller('AnonController', AnonController);

  AnonController.$inject = ['$rootScope', '$state'];
  function AnonController (  $rootScope,   $state) {

    $rootScope.$on('authorized', () => {
      $state.go('app.user.dashboard');
    });

  };
