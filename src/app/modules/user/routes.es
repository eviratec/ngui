
  angular.module('DataStudioWebui.User')
    .config(['$stateProvider', function ($stateProvider) {

      $stateProvider

        .state('app.user', {
          templateUrl: 'modules/user/html/root.html',
          controller: 'UserController',
          controllerAs: '$user',
          abstract: true,
          resolve: {
            userApps: ['$api', function ($api) {
              return $api.apiGet('/apps/all')
                .then(function (res) {
                  return res.data;
                })
                .catch(function (err) {
                  console.log(err);
                  return [];
                });
            }],
            user: ['$auth', '$api', '$state', function ($auth, $api, $state) {
              return $api.apiGet(`/user/${$auth.user.Id}`)
                .then(function (res) {
                  return res.data;
                })
                .catch(function (err) {
                  $state.go('app.anon.login');
                });
            }],
          },
        });

  }]);
