
  angular.module('DataStudioWebui.User')
    .controller('UserController', UserController);

  UserController.$inject = ['$api', '$scope', '$rootScope', '$auth', '$state', '$mdDialog', '$timeout', 'user', 'userApps'];
  function UserController (  $api,   $scope,   $rootScope,   $auth,   $state,   $mdDialog,   $timeout,   user,   userApps) {

    $rootScope.$on('unauthorized', () => {
      $state.go('app.anon.login');
    });

    if (!$auth.isAuthorized) {
      $state.go('app.anon.login');
    }

    $scope.showSidenavApps = true;
    $scope.apps = userApps;
    $scope.user = user;

    $scope.login = user.Login;

    $scope.createApp = function ($event) {

      var confirm = $mdDialog.prompt()
        .title('Name your new app')
        .placeholder('My App')
        .ariaLabel('App name')
        .initialValue('')
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

      $api.apiPost('/apps', newApp)
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
