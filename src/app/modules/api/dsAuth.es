
  angular.module('DataStudioWebui.Api')
    .factory('$auth', dsAuthFactory);

  dsAuthFactory.$inject = ['User', 'Token', '$rootScope', 'clientStore'];
  function dsAuthFactory (  User,   Token,   $rootScope,   clientStore) {

    class Auth {
      constructor () {
        this.isAuthorized = false;
        this.token = null;
        this.user = null;
      }
      get authorization () {
        if (null === this.token) {
          return '';
        }
        return this.token.Key;
      }
      auth (key) {
        this.token = new Token(key);
        this.user = new User(this.token.UserId);
        this.isAuthorized = true;
        clientStore.setStoredToken(key);
        $rootScope.$emit('authorized');
        return this;
      }
      remove () {
        this.token = null;
        this.user = null;
        this.isAuthorized = false;
        clientStore.clearStoredToken();
        $rootScope.$emit('unauthorized');
        return this;
      }
    }

    return new Auth();

  }
