
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
        .state('app.user.app.apis', {
          url:'/apis',
          templateUrl: 'modules/appEditor/html/apis.html'
        })
        .state('app.user.app.clients', {
          url:'/clients',
          templateUrl: 'modules/appEditor/html/clients.html'
        });

  }]);
