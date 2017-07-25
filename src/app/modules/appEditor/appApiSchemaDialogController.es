
  angular.module('DataStudioWebui.AppEditor')
    .factory('ApiSchema', ApiSchemaFactory);

  ApiSchemaFactory.$inject = [];
  function ApiSchemaFactory () {

    class ApiSchema {
      constructor (operations, routes) {
        this.operations = operations;
        this.routes = routes;
      }
      toJSON () {
        let operations = this.operations;
        let routes = this.routes;
        let schema = {};
        let routePaths = {};

        routes.forEach(route => {
          let path = route.Path;
          schema[path] = {};
          routePaths[route.Id] = path;
        });

        operations.forEach(operation => {
          let targetPath = routePaths[operation.RouteId];
          let pathExists = targetPath in schema;
          if (!pathExists) {
            return;
          }
          schema[targetPath][operation.Method] = {
            operationId: operation.Name,
          };
        });

        return schema;
      }
    };

    return ApiSchema;

  }

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
