
  angular.module('DataStudioWebui.Api')
    .factory('$login', dsLoginFactory);

  dsLoginFactory.$inject = ['$auth', '$api'];
  function dsLoginFactory (  $auth,   $api) {
    return function (Login, Password) {
      return new Promise((resolve, reject) => {
        $api.apiPost('/auth/attempts', {
          Login: Login,
          Password: Password,
        })
        .then((res) => {
          let token = res.data.Token;
          if (token) {
            $auth.auth(token.Key);
            return resolve();
          }
          reject(new Error(res.data.Error));
        })
        .catch(reject);
      });
    };
  };
