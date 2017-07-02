
  angular.module('DataStudioWebui.AppEditor')
    .config(['$stateProvider', function ($stateProvider) {

      $stateProvider
        .state('app.user.app', {
          url:'/app/:appId',
          templateUrl: 'modules/appEditor/html/root.html',
          controller: 'AppEditorController',
          controllerAs: '$app',
          abstract: true,
          resolve: {
            app: ['$api', '$stateParams', function ($api, $stateParams) {
              let appId = $stateParams.appId;
              return $api.apiGet(`/app/${appId}`)
                .then(function (res) {
                  return res.data;
                })
                .catch(function (err) {
                  console.log(err);
                  return {};
                });
            }],
          }
        })
        .state('app.user.app.dashboard', {
          url:'',
          templateUrl: 'modules/appEditor/html/dashboard.html'
        })
        .state('app.user.app.schemas', {
          url:'/schemas',
          templateUrl: 'modules/appEditor/html/schemas.html'
        })
        .state('app.user.app.schema', {
          url:'/schema/:schemaId',
          templateUrl: 'modules/appEditor/html/schema.html',
          controller: 'AppSchemaEditorController',
          controllerAs: '$schemaCtrl',
          resolve: {
            schema: ['$api', '$stateParams', function ($api, $stateParams) {
              let appId = $stateParams.appId;
              let schemaId = $stateParams.schemaId;
              return $api.apiGet(`/app/${appId}/schema/${schemaId}`)
                .then(function (res) {
                  return res.data;
                })
                .catch(function (err) {
                  console.log(err);
                  return {};
                });
            }],
          }
        })
        .state('app.user.app.apis', {
          url:'/apis',
          templateUrl: 'modules/appEditor/html/apis.html'
        })
        .state('app.user.app.api', {
          url:'/api/:apiId',
          templateUrl: 'modules/appEditor/html/api.html',
          controller: 'AppApiEditorController',
          controllerAs: '$apiCtrl',
          resolve: {
            api: ['$api', '$stateParams', function ($api, $stateParams) {
              let appId = $stateParams.appId;
              let apiId = $stateParams.apiId;
              return $api.apiGet(`/app/${appId}/api/${apiId}`)
                .then(function (res) {
                  return res.data;
                })
                .catch(function (err) {
                  console.log(err);
                  return {};
                });
            }],
          }
        })
        .state('app.user.app.clients', {
          url:'/clients',
          templateUrl: 'modules/appEditor/html/clients.html'
        });

  }]);
