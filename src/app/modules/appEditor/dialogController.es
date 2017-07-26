
  angular.module('DataStudioWebui.AppEditor')
    .controller('AppApiSchemaDialogController', AppApiSchemaDialogController);

  AppApiSchemaDialogController.$inject = ['ApiSchema', '$scope', '$mdDialog', 'operations', 'routes'];
  function AppApiSchemaDialogController (  ApiSchema,   $scope,   $mdDialog,   operations,   routes) {

    let schema = new ApiSchema(operations.all, routes);

    $scope.schema = JSON.stringify(schema, undefined, '  ');

    $scope.selectAll = function () {
      let dialogEl = document.getElementById('Dialog_ViewApiSchema');
      let sourceEl = dialogEl.querySelector("div[class='schema-source']");
      if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(sourceEl);
        range.select();
        return;
      }
      if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(sourceEl);
        window.getSelection().addRange(range);
        return;
      }
    };

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
