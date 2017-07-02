
  angular.module('DataStudioWebui.User')
    .controller('LayoutController', LayoutController);

  LayoutController.$inject = ['$scope', '$mdDialog', '$logout', '$mdSidenav'];
  function LayoutController (  $scope,   $mdDialog,   $logout,   $mdSidenav) {

    let originatorEv;

    $scope.toggleSidenav = function (menuId) {
      $mdSidenav(menuId).toggle();
    };

    $scope.changePassword = function () {
      $mdToast.show(
        $mdToast.simple()
        .content('Password clicked!')
        .position('top right')
        .hideDelay(2000)
      );
    };

    $scope.changeProfile = function (ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'app/modules/layouts/main-page/user-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(answer) {
        $mdToast.show(
          $mdToast.simple()
          .content('You said the information was "' + answer + '".')
          .position('top right')
          .hideDelay(2000)
        );

      }, function() {
        $mdToast.show(
          $mdToast.simple()
          .content('You cancelled the dialog.')
          .position('top right')
          .hideDelay(2000)
        );
      });

      function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };
      }
    };


    $scope.logout = function () {
      $logout();
    };

    $scope.openMenu = function ($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

  };
