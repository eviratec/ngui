
  angular.module('DataStudioWebui.Api')
    .factory('$logout', dsLogoutFactory);

  dsLogoutFactory.$inject = ['$auth', '$api'];
  function dsLogoutFactory (  $auth,   $api) {
    return function () {
      return new Promise((resolve, reject) => {
        // $api.apiPost('/logout', {})
        //   .then((res) => {
            $auth.remove();
            return resolve();
          // })
          // .catch(reject);
      });
    };

  };
