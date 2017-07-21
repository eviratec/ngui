
  angular.module('DataStudioWebui.User')
    .controller('SidenavController', SidenavController);

  SidenavController.$inject = ['$scope', '$mdSidenav'];
  function SidenavController (  $scope,   $mdSidenav) {

    $scope.toggleSidenav = function (menuId) {
      $mdSidenav(menuId).toggle();
    };

  };
