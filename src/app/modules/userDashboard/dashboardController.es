
  angular.module('DataStudioWebui.UserDashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', '$mdDialog', 'userApps'];
  function DashboardController (  $scope,   $mdDialog,   userApps) {

    $scope.apps = userApps;

  };
