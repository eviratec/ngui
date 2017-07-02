
  angular.module('DataStudioWebui.User')
    .controller('UserController', UserController);

  UserController.$inject = ['$scope', '$rootScope', '$auth', '$state', '$mdDialog', 'user'];
  function UserController (  $scope,   $rootScope,   $auth,   $state,   $mdDialog,   user) {

    $rootScope.$on('unauthorized', () => {
      $state.go('app.anon.login');
    });

    if (!$auth.isAuthorized) {
      $state.go('app.anon.login');
    }

    $scope.showSidenavApps = true;
    $scope.apps = [];

    $scope.login = 'test';

    $scope.createApp = function ($event) {

      var confirm = $mdDialog.prompt()
        .title('Name your new app')
        .placeholder('My First App')
        .ariaLabel('App name')
        .initialValue('My First App')
        .targetEvent($event)
        .ok('Create App')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function(result) {
        createApp(result);
      }, function() {

      });

    };

    function createApp (name) {

      let newApp = {
        Name: name,
      };

      homeService
        .createApp(newApp)
        .then(function (res) {
          $timeout(function () {
            Object.assign(newApp, res.data);
            newApp.Id = res.data.Id;
          });
        })
        .catch(function (err) {
          console.log(err);
        });

      $scope.apps.push(newApp);

    }

  };
