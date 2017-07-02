
  angular.module('DataStudioWebui.Api')
    .factory('User', UserFactory);

  UserFactory.$inject = [];
  function UserFactory () {

    class User {
      constructor (Id) {

        this.Id = Id;
        this.Login = null;

        this.Apps = [];

      }
    }

    return User;

  }
