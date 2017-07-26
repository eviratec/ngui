
  angular.module('DataStudioWebui.Api')
    .factory('$api', dsApiFactory);

  dsApiFactory.$inject = ['$auth', '$appEnvironment', '$http'];
  function dsApiFactory (  $auth,   $appEnvironment,   $http) {

    const POST = 'post';
    const GET = 'get';
    const DELETE = 'delete';

    class DsApi {
      constructor () {
        this.url = $appEnvironment.config.apiUrl;
      }
      apiGet (url) {
        let dsApi = this;
        return new Promise((resolve, reject) => {
          let authorization = this.authorization;
          let opts = {
            method: GET,
            url: dsApi.url + url,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
          };

          if (hasAuthorization()) {
            opts.headers['Authorization'] = getAuthorization();
          }

          $http(opts).then(resolve, reject);
        });
      }
      apiPost (url, d) {
        let dsApi = this;
        return new Promise((resolve, reject) => {
          let authorization = this.authorization;
          let opts = {
            method: POST,
            url: dsApi.url + url,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
          };

          if (hasAuthorization()) {
            opts.headers['Authorization'] = getAuthorization();
          }

          if (d) {
            opts.data = JSON.stringify(d);
          }

          $http(opts).then(resolve, reject);
        });
      }
      apiDelete (url) {
        let dsApi = this;
        return new Promise((resolve, reject) => {
          let authorization = this.authorization;
          let opts = {
            method: DELETE,
            url: dsApi.url + url,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
          };

          if (hasAuthorization()) {
            opts.headers['Authorization'] = getAuthorization();
          }

          $http(opts).then(resolve, reject);
        });
      }
    }

    return new DsApi();

    function hasAuthorization () {
      return $auth.isAuthorized;
    }
    function getAuthorization () {
      return $auth.authorization;
    }

  }
