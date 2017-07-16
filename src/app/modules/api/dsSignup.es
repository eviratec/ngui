
  angular.module('DataStudioWebui.Api')
    .factory('$signup', dsSignupFactory);

  dsSignupFactory.$inject = ['$auth', '$api'];
  function dsSignupFactory (  $auth,   $api) {
    return function (Email, NewPassword) {
      return new Promise((resolve, reject) => {
        $api.apiPost('/signups', {
          Email: Email,
          NewPassword: NewPassword,
        })
        .then((res) => {
          if (202 === res.status) {
            return resolve();
          }
          reject(new Error(res.data.Error || "UNKNOWN_ERROR_408392"));
        })
        .catch((res) => {
          if (400 === res.status) {
            return reject(res.data.ErrorMsg)
          }
          console.log(res);
          reject(new Error("UNKNOWN_ERROR_408393"))
        });
      });
    };
  };
