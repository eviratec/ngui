
  angular.module('DataStudioWebui.AppEditor')
    .controller('AppApiEditorController', AppApiEditorController);

  AppApiEditorController.$inject = ['$api', '$timeout', '$scope', '$state', '$mdDialog', 'api'];
  function AppApiEditorController (  $api,   $timeout,   $scope,   $state,   $mdDialog,   api) {

    let $apiCtrl = this;

    $apiCtrl.api = api;

    $apiCtrl.paths = [
      { Path: '/users', Methods: ['POST', 'GET'] },
      { Path: '/user/:userId', Methods: ['DELETE', 'PUT', 'GET'] },
      { Path: '/user/:userId/profile', Methods: ['PUT', 'GET'] },
    ];

  }
