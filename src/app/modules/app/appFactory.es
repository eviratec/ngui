
  angular.module('DataStudioWebui')
    .factory('$app', dsAppFactory);

  dsAppFactory.$inject = ['clientStore', 'Token'];
  function dsAppFactory (  clientStore,   Token) {

    let $app;

    class App {
      constructor () {

        this.user = null;
        this.loggedin = false;

      }
      login () {

      }
      logout () {

      }
      auth (tokenKey) {
        let token = new Token(tokenKey);
      }
    }

    $app = new App();

    if (clientStore.hasStoredToken()) {
      $app.auth(clientStore.getStoredToken());
    }

    return $app;

  }
