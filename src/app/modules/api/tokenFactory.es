
  angular.module('DataStudioWebui.Api')
    .factory('Token', TokenFactory);

  TokenFactory.$inject = [];
  function TokenFactory () {

    class Token {
      constructor (key) {

        let keyParts = key.split(/\//g);

        this.Key = key;
        this.Id = keyParts[0];
        this.UserId = keyParts[1];
        this.Created = keyParts[2];

      }
    }

    return Token;

  }
