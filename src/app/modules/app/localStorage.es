
  angular.module('DataStudioWebui')
    .constant('TOKEN_KEY', 'DSWEBUISESS_KEY');

  angular.module('DataStudioWebui')
    .provider('$localStorage', localStorageProvider);

  localStorageProvider.$inject = [];
  function localStorageProvider () {
    this.$get = function () {
      return window.localStorage;
    };
  }

  angular.module('DataStudioWebui')
    .factory('clientStore', clientStore);

  clientStore.$inject = ['$localStorage', 'TOKEN_KEY'];
  function clientStore (  $localStorage,   TOKEN_KEY) {

    return {
      hasStoredToken: function () {
        return !!(TOKEN_KEY in $localStorage && $localStorage[TOKEN_KEY]);
      },
      getStoredToken: function () {
        return TOKEN_KEY in $localStorage && $localStorage[TOKEN_KEY] || null;
      },
      setStoredToken: function (newValue) {
        return $localStorage.setItem(TOKEN_KEY, newValue);
      },
      clearStoredToken: function () {
        return $localStorage.removeItem(TOKEN_KEY);
      },
      clearEverything: function () {
        return $localStorage.clear();
      },
    };

  }
