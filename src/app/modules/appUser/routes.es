
  angular.module('DataStudioWebui.AppUser')
    .config(['$stateProvider', function ($stateProvider) {

      $stateProvider

        .state('app.user', {
          url: '/',
          templateUrl: 'modules/appUser/html/appUser.html',
          controller: 'AppUserController',
          controllerAs: '$appUser',
        });

  }]);
