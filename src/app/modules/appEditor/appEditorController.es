
  angular.module('DataStudioWebui.AppEditor')
    .controller('AppEditorController', AppEditorController);

  AppEditorController.$inject = ['$scope', '$state', '$mdDialog', 'app'];
  function AppEditorController (  $scope,   $state,   $mdDialog,   app) {

    let _app = {
      model: app,
      schemas: app.Schemas,
      apis: app.Apis,
      clients: app.Clients,
    };

    $scope.currentNavItem = "overview";

    $scope.go = function (dest) {
      $state.go(`app.user.app.${dest}`);
    };

    console.log(_app);

    $scope.model = _app.model;
    $scope.schemas = _app.schemas;
    $scope.apis = _app.apis;
    $scope.clients = _app.clients;

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
        // appService.createAppApi(app.model.Id, {
        //   Name: result,
        // })
        // .then(function (d) {
        //   $timeout(function () {
        //     $app.apis.push(d.data);
        //   });
        // });
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
        // appService.createAppClient(app.model.Id, {
        //   Name: result,
        // })
        // .then(function (d) {
        //   $timeout(function () {
        //     $app.clients.push(d.data);
        //   });
        // });
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
        // appService.createAppSchema(app.model.Id, {
        //   Name: result,
        // })
        // .then(function (d) {
        //   $timeout(function () {
        //     $app.schemas.push(d.data);
        //   });
        // });
      }, function() {
        // dialog cancelled
      });
    };

  };
