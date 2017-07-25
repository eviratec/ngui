
  angular.module('DataStudioWebui.AppEditor')
    .controller('AppApiSchemaDialogController', AppApiSchemaDialogController);

  AppApiSchemaDialogController.$inject = ['ApiSchema', '$scope', '$mdDialog', 'operations', 'routes'];
  function AppApiSchemaDialogController (  ApiSchema,   $scope,   $mdDialog,   operations,   routes) {

    let schema = new ApiSchema(operations.all, routes);

    $scope.schema = JSON.stringify(schema, undefined, '  ');

    $scope.hide = function() {
      $mdDialog.cancel();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function() {
      $mdDialog.hide();
    };

  }

  angular.module('DataStudioWebui.AppEditor')
    .controller('CreateApiOperationDialogController', CreateApiOperationDialogController);

  CreateApiOperationDialogController.$inject = ['$scope', '$mdDialog', 'apiRoute'];
  function CreateApiOperationDialogController (  $scope,   $mdDialog,   apiRoute) {
    $scope.$data = {
      Method: 'get',
      _apiRoute: apiRoute,
    };

    $scope.apiRoute = apiRoute;

    $scope.hide = function() {
      $mdDialog.cancel();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function() {
      $mdDialog.hide($scope.$data);
    };
  }
