
  angular.module('DataStudioWebui')
    .config(['$stateProvider', function ($stateProvider) {

      $stateProvider

        .state('app', {
          templateUrl: 'modules/app/html/app.html',
          controller: 'AppController',
          controllerAs: '$app',
          abstract: true,
        });

  }]);
