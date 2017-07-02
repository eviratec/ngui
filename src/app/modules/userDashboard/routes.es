
  angular.module('DataStudioWebui.UserDashboard')
    .config(['$stateProvider', function ($stateProvider) {

      $stateProvider

        .state('app.user.dashboard', {
          url: '/dashboard',
          templateUrl: 'modules/userDashboard/html/dashboard.html',
          controller: 'DashboardController',
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
            }]
          }
        });

  }]);
