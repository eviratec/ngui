
  angular.module('DataStudioWebui')
    .config(['$stateProvider', function ($stateProvider) {

      $stateProvider

        .state('app', {
          templateUrl: 'modules/app/html/app.html',
          controller: 'AppController',
          controllerAs: '$app',
          abstract: true,
          resolve: {
            _auth: ['$auth', 'clientStore', function ($auth, clientStore) {
              if (clientStore.hasStoredToken()) {
                return $auth.auth(clientStore.getStoredToken());
              }
              return $auth;
            }],
          },
        });

  }]);
