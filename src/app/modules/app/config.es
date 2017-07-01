
  angular.module('DataStudioWebui')
    .config(appEnvironment)
    .config(appLocation)
    .config(appThemes)

  appEnvironment.$inject = ['$appEnvironmentProvider'];
  function appEnvironment (  $appEnvironmentProvider) {

    $appEnvironmentProvider
    .setDefaults({
      titlePrefix: '??? :: ',
      apiUrl: 'http://localhost:3000',
    })
    .addEnvironment('local', ['127.0.0.1', 'localhost', /\.local$/i], {
      titlePrefix: 'LOCAL :: ',
      apiUrl: 'http://localhost:3000',
    })
    .addEnvironment('prod', 'webui.datastudio.eviratec.software', {
      titlePrefix: '',
      apiUrl: 'https://api.datastudio.eviratec.software',
    })
    .defaultEnvironmentName('local');

  }

  appLocation.$inject = ['$locationProvider'];
  function appLocation (  $locationProvider) {
    $locationProvider.html5Mode(true);
  }

  appThemes.$inject = ['$mdThemingProvider'];
  function appThemes (  $mdThemingProvider) {

    var dsPurpleMap = $mdThemingProvider.extendPalette('purple', {
      '500': '#8E24AA',
      'contrastDefaultColor': 'light'
    });

    $mdThemingProvider.definePalette('dsPurple', dsPurpleMap);

    $mdThemingProvider.theme('default')
      .primaryPalette('dsPurple');

    var sidebarBlueGreyMap = $mdThemingProvider.extendPalette('blue-grey', {
      // 'contrastDefaultColor': 'dark',
    });

    $mdThemingProvider.definePalette('sidebarBlueGrey', sidebarBlueGreyMap);

    $mdThemingProvider.theme('sidenavTheme')
      .primaryPalette('blue-grey')
      .dark();

  }
