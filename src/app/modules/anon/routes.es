
  angular.module('DataStudioWebui')
    .config(['$stateProvider', function ($stateProvider) {

      $stateProvider

        .state('app.anon', {
          templateUrl: 'modules/anon/html/root.html',
          controller: 'AnonController',
          controllerAs: '$anon',
          abstract: true,
        })

        .state('app.anon.login', {
          url: '/login',
          templateUrl: 'modules/anon/html/login.html',
        })

        .state('app.anon.signup', {
          url: '/signup',
          templateUrl: 'modules/anon/html/signup.html',
        });

  }]);
