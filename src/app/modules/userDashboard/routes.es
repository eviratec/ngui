
  angular.module('DataStudioWebui.UserDashboard')
    .config(['$stateProvider', function ($stateProvider) {

      $stateProvider

        .state('app.user.dashboard', {
          url: '/dashboard',
          templateUrl: 'modules/userDashboard/html/dashboard.html',
          controller: 'DashboardController',
        });

  }]);
