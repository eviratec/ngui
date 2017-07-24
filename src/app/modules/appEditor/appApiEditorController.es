
  angular.module('DataStudioWebui.AppEditor')
    .controller('AppApiEditorController', AppApiEditorController);

  AppApiEditorController.$inject = ['$api', '$timeout', '$scope', '$state', '$mdDialog', 'api', 'routes', 'operations'];
  function AppApiEditorController (  $api,   $timeout,   $scope,   $state,   $mdDialog,   api,   routes,   operations) {

    let $apiCtrl = this;

    $apiCtrl.api = api;

    $apiCtrl.operations = operations;
    $apiCtrl.routes = routes;

    $apiCtrl.createOperation = function ($event, route) {

      let createApiOperation = {
        controller: 'CreateApiOperationDialogController',
        templateUrl: 'modules/appEditor/html/dialog/createApiOperation.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose: true,
        fullscreen: false,
        locals: {
          apiRoute: route,
        },
      };

      $mdDialog.show(createApiOperation).then(function(data) {
        createOperation(data);
      }, function() {

      });

    }

    function createOperation (data) {

      data = data || {};

      let route = data._apiRoute;
      let name = data.Name;
      let method = data.Method;

      let routeId = route.Id || null;
      let newOperation = {
        RouteId: routeId,
        Name: name,
        Method: method,
      };

      $api.apiPost('/api/' + apiId() + '/operations', newOperation)
        .then(function (res) {
          $timeout(function () {
            Object.assign(newOperation, res.data);
            newOperation.Id = res.data.Id;

            if (null === routeId) {
              return $apiCtrl.operations.orphaned.push(newOperation);
            }

            $apiCtrl.operations.byRouteId[routeId] = $apiCtrl.operations.byRouteId[routeId] || [];
            $apiCtrl.operations.byRouteId[routeId].push(newOperation);
          });
        })
        .catch(function (err) {
          console.log(err);
        });

    }

    $apiCtrl.createRoute = function ($event) {

      var confirm = $mdDialog.prompt()
        .title('Specify the Route Path')
        .placeholder('/my/api/path')
        .ariaLabel('Route Path')
        .initialValue('/my/api/path')
        .targetEvent($event)
        .ok('Create Route')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function(path) {
        createRoute(path);
      }, function() {

      });

    };

    function createRoute (path) {

      let newRoute = {
        Path: path,
      };

      $api.apiPost('/api/' + apiId() + '/routes', newRoute)
        .then(function (res) {
          $timeout(function () {
            Object.assign(newRoute, res.data);
            newRoute.Id = res.data.Id;
          });
        })
        .catch(function (err) {
          console.log(err);
        });

      $apiCtrl.routes.push(newRoute);

    }

    function apiId () {
      return $apiCtrl.api.Id;
    }

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
