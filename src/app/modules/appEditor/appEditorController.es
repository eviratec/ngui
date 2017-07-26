
  angular.module('DataStudioWebui.AppEditor')
    .controller('AppEditorController', AppEditorController);

  AppEditorController.$inject = ['$api', '$timeout', '$rootScope', '$scope', '$state', '$mdDialog', 'app'];
  function AppEditorController (  $api,   $timeout,   $rootScope,   $scope,   $state,   $mdDialog,   app) {

    let _app = {
      model: app,
      schemas: app.Schemas,
      apis: app.Apis,
      clients: app.Clients,
    };

    $scope.chips = ["Id"];
    $scope.currentNavItem = $state.current.data.name;

    $scope.go = function (dest) {
      $state.go(`app.user.app.${dest}`);
    };

    console.log(_app);

    $scope.model = _app.model;
    $scope.schemas = _app.schemas;
    $scope.apis = _app.apis;
    $scope.clients = _app.clients;

    $rootScope.$on('$stateChangeSuccess', function ($event, toState, toParams) {
      console.log("*****",toState.data.name);
      $timeout(function () {
        $scope.currentNavItem = toState.data.name;
      });
    });

    $scope.addApiDialog = function ($event) {
      var confirm = $mdDialog.prompt()
        .title('API Name')
        .textContent('Choose a name for the API')
        .placeholder('e.g. UserApi')
        .ariaLabel('API Name')
        .initialValue('')
        .targetEvent($event)
        .ok('Add API')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function(result) {

        let appId = $scope.model.Id;

        $api.apiPost(`/app/${appId}/apis`, { Name: result })
          .then(function (res) {
            $timeout(function () {
              $scope.apis.push(res.data);
            });
          })
          .catch(function (err) {
            console.log(err);
          });

      }, function() {
        // dialog cancelled
      });
    };
    $scope.addClientDialog = function ($event) {
      var confirm = $mdDialog.prompt()
        .title('Client Name')
        .textContent('Choose a name for the Client')
        .placeholder('e.g. WebClient')
        .ariaLabel('Client Name')
        .initialValue('')
        .targetEvent($event)
        .ok('Add Client')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function(result) {

        let appId = $scope.model.Id;

        $api.apiPost(`/app/${appId}/clients`, { Name: result })
          .then(function (res) {
            $timeout(function () {
              $scope.clients.push(res.data);
            });
          })
          .catch(function (err) {
            console.log(err);
          });

      }, function() {
        // dialog cancelled
      });
    };
    $scope.addSchemaDialog = function ($event) {
      var confirm = $mdDialog.prompt()
        .title('Schema Name')
        .textContent('Choose a name for the Schema')
        .placeholder('e.g. UserProfile')
        .ariaLabel('Schema Name')
        .initialValue('')
        .targetEvent($event)
        .ok('Add Schema')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function(result) {

        let appId = $scope.model.Id;

        $api.apiPost(`/app/${appId}/schemas`, { Name: result })
          .then(function (res) {
            $timeout(function () {
              $scope.schemas.push(res.data);
            });
          })
          .catch(function (err) {
            console.log(err);
          });

      }, function() {
        // dialog cancelled
      });
    };

  };
