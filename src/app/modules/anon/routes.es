
  angular.module('DataStudioWebui.Anon')
    .config(['$stateProvider', function ($stateProvider) {

      $stateProvider

        .state('app.anon', {
          templateUrl: 'modules/anon/html/root.html',
          controller: 'AnonController',
          controllerAs: '$anon',
          abstract: true,
          resolve: {
            authorized: ['$auth', '$state', function ($auth, $state) {
              if ($auth.isAuthorized) {
                $state.go('app.user.dashboard');
              }
              return $auth.isAuthorized;
            }]
          }
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
