
  angular.module('DataStudioWebui.AppEditor')
    .controller('AppSchemaEditorController', AppSchemaEditorController);

  AppSchemaEditorController.$inject = ['$api', '$timeout', '$scope', '$state', '$mdDialog', 'schema'];
  function AppSchemaEditorController (  $api,   $timeout,   $scope,   $state,   $mdDialog,   schema) {

    let $schemaCtrl = this;

    const STRING = 'string';

    $schemaCtrl.schema = schema;
    $schemaCtrl.properties = [
      { Key: 'Id', Type: STRING, Format: 'uuid' },
      { Key: 'Name', Type: STRING },
    ];

  }
