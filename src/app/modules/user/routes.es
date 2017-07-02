
  angular.module('DataStudioWebui.User')
    .config(['$stateProvider', function ($stateProvider) {

      $stateProvider

        .state('app.user', {
          templateUrl: 'modules/user/html/root.html',
          controller: 'UserController',
          controllerAs: '$user',
          abstract: true,
        });

  }]);
