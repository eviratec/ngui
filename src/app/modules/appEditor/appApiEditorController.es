
  angular.module('DataStudioWebui.AppEditor')
    .controller('AppApiEditorController', AppApiEditorController);

  AppApiEditorController.$inject = ['$api', '$timeout', '$scope', '$state', '$mdDialog', 'api', 'routes', 'operations'];
  function AppApiEditorController (  $api,   $timeout,   $scope,   $state,   $mdDialog,   api,   routes,   operations) {

    let $apiCtrl = this;

    $apiCtrl.api = api;

    $apiCtrl.operations = operations;
    $apiCtrl.routes = routes;

    $apiCtrl.createOperation = function ($event, route) {

      var confirm = $mdDialog.prompt()
        .title('Name the Operation')
        .placeholder('Operation Name/ID')
        .ariaLabel('Operation Name/ID')
        .initialValue('getObject')
        .targetEvent($event)
        .ok('Create Operation')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function(operationId) {
        createOperation(route, operationId);
      }, function() {

      });

    }

    function createOperation (route, operationId) {

      let routeId = route.Id || null;
      let newOperation = {
        RouteId: routeId,
        Name: operationId,
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
