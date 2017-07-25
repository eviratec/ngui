'use strict';

angular.module('DataStudioWebui', ['ngAnimate', 'ngAria', 'ngCookies', 'ngMaterial', 'ngMessages', 'ui.router', 'luminous.environment', 'DataStudioWebui.Api', 'DataStudioWebui.Anon', 'DataStudioWebui.User', 'DataStudioWebui.AppEditor']);
'use strict';

angular.module('DataStudioWebui').config(appDefaultRoute).config(appEnvironment).config(appLocation).config(appThemes).run(appInit);

appEnvironment.$inject = ['$appEnvironmentProvider'];
function appEnvironment($appEnvironmentProvider) {

  $appEnvironmentProvider.setDefaults({
    titlePrefix: '??? :: ',
    apiUrl: 'http://localhost:3000'
  }).addEnvironment('local', ['127.0.0.1', 'localhost', /\.localhost$/i], {
    titlePrefix: 'LOCAL :: ',
    apiUrl: 'http://api.datastudio.localhost'
  }).addEnvironment('prod', 'webui.datastudio.eviratec.software', {
    titlePrefix: '',
    apiUrl: 'https://api.datastudio.eviratec.software'
  }).defaultEnvironmentName('local');
}

appLocation.$inject = ['$locationProvider'];
function appLocation($locationProvider) {
  $locationProvider.html5Mode(true);
}

appDefaultRoute.$inject = ['$urlRouterProvider'];
function appDefaultRoute($urlRouterProvider) {
  $urlRouterProvider.otherwise('/dashboard');
}

appThemes.$inject = ['$mdThemingProvider'];
function appThemes($mdThemingProvider) {

  var dsPurpleMap = $mdThemingProvider.extendPalette('purple', {
    '500': '#8E24AA',
    'contrastDefaultColor': 'light'
  });

  $mdThemingProvider.definePalette('dsPurple', dsPurpleMap);

  $mdThemingProvider.theme('default').primaryPalette('dsPurple');

  var sidebarBlueGreyMap = $mdThemingProvider.extendPalette('blue-grey', {
    // 'contrastDefaultColor': 'dark',
  });

  $mdThemingProvider.definePalette('sidebarBlueGrey', sidebarBlueGreyMap);

  $mdThemingProvider.theme('darknav').primaryPalette('dsPurple').dark();

  $mdThemingProvider.theme('sidenavTheme').primaryPalette('grey').dark();
}

appInit.$inject = ['$appEnvironment', '$document'];
function appInit($appEnvironment, $document) {

  $document[0].title = $appEnvironment.config.titlePrefix + 'DataStudio Web UI';

  var robotoFontSrc = "https://fonts.googleapis.com/css?family=Roboto:200,300,400,500";
  var linkEl = $document[0].createElement('link');

  linkEl.setAttribute("rel", "stylesheet");
  linkEl.setAttribute("href", robotoFontSrc);

  $document[0].body.appendChild(linkEl);
}
'use strict';

angular.module('DataStudioWebui').config(['$stateProvider', function ($stateProvider) {

  $stateProvider.state('app', {
    templateUrl: 'modules/app/html/app.html',
    controller: 'AppController',
    controllerAs: '$app',
    abstract: true,
    resolve: {
      _auth: ['$auth', 'clientStore', function ($auth, clientStore) {
        if (clientStore.hasStoredToken()) {
          return $auth.auth(clientStore.getStoredToken());
        }
        return $auth;
      }]
    }
  });
}]);
'use strict';

angular.module('DataStudioWebui').controller('AppController', AppController);

AppController.$inject = ['$scope', '$auth', '$animate'];
function AppController($scope, $auth, $animate) {};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

angular.module('DataStudioWebui').factory('$app', dsAppFactory);

dsAppFactory.$inject = ['clientStore', 'Token'];
function dsAppFactory(clientStore, Token) {

  var $app = void 0;

  var App = function () {
    function App() {
      _classCallCheck(this, App);

      this.user = null;
      this.loggedin = false;
    }

    _createClass(App, [{
      key: 'login',
      value: function login() {}
    }, {
      key: 'logout',
      value: function logout() {}
    }, {
      key: 'auth',
      value: function auth(tokenKey) {
        var token = new Token(tokenKey);
      }
    }]);

    return App;
  }();

  $app = new App();

  if (clientStore.hasStoredToken()) {
    $app.auth(clientStore.getStoredToken());
  }

  return $app;
}
'use strict';

angular.module('DataStudioWebui').constant('TOKEN_KEY', 'DSWEBUISESS_KEY');

angular.module('DataStudioWebui').provider('$localStorage', localStorageProvider);

localStorageProvider.$inject = [];
function localStorageProvider() {
  this.$get = function () {
    return window.localStorage;
  };
}

angular.module('DataStudioWebui').factory('clientStore', clientStore);

clientStore.$inject = ['$localStorage', 'TOKEN_KEY'];
function clientStore($localStorage, TOKEN_KEY) {

  return {
    hasStoredToken: function hasStoredToken() {
      return !!(TOKEN_KEY in $localStorage && $localStorage[TOKEN_KEY]);
    },
    getStoredToken: function getStoredToken() {
      return TOKEN_KEY in $localStorage && $localStorage[TOKEN_KEY] || null;
    },
    setStoredToken: function setStoredToken(newValue) {
      return $localStorage.setItem(TOKEN_KEY, newValue);
    },
    clearStoredToken: function clearStoredToken() {
      return $localStorage.removeItem(TOKEN_KEY);
    },
    clearEverything: function clearEverything() {
      return $localStorage.clear();
    }
  };
}
'use strict';

angular.module('DataStudioWebui.Anon', ['ngAnimate', 'ngAria', 'ngCookies', 'ngMaterial', 'ngMessages', 'ui.router', 'luminous.environment', 'DataStudioWebui.Api']);
'use strict';

angular.module('DataStudioWebui.Api', ['ngAnimate', 'ngAria', 'ngCookies', 'ngMaterial', 'ngMessages', 'ui.router', 'luminous.environment']);
'use strict';

angular.module('DataStudioWebui.AppEditor', ['ngAnimate', 'ngAria', 'ngCookies', 'ngMaterial', 'ngMessages', 'ui.router', 'luminous.environment']);
'use strict';

angular.module('DataStudioWebui.User', ['ngAnimate', 'ngAria', 'ngCookies', 'ngMaterial', 'ngMessages', 'ui.router', 'luminous.environment', 'DataStudioWebui.UserDashboard']);
'use strict';

angular.module('DataStudioWebui.UserDashboard', ['ngAnimate', 'ngAria', 'ngCookies', 'ngMaterial', 'ngMessages', 'ui.router', 'luminous.environment']);
'use strict';

angular.module('DataStudioWebui.Anon').config(['$stateProvider', function ($stateProvider) {

  $stateProvider.state('app.anon', {
    templateUrl: 'modules/anon/html/root.html',
    controller: 'AnonController',
    controllerAs: '$anon',
    abstract: true,
    resolve: {
      authorized: ['$auth', '$state', function ($auth, $state) {
        if ($auth.isAuthorized) {
          $state.go('app.user.dashboard');
        }
        return $auth.isAuthorized;
      }]
    }
  }).state('app.anon.login', {
    url: '/login',
    templateUrl: 'modules/anon/html/login.html'
  }).state('app.anon.signup', {
    url: '/signup',
    templateUrl: 'modules/anon/html/signup.html'
  });
}]);
'use strict';

angular.module('DataStudioWebui.AppEditor').config(['$stateProvider', function ($stateProvider) {

  $stateProvider.state('app.user.app', {
    url: '/app/:appId',
    templateUrl: 'modules/appEditor/html/root.html',
    controller: 'AppEditorController',
    controllerAs: '$app',
    abstract: true,
    resolve: {
      app: ['$api', '$stateParams', function ($api, $stateParams) {
        var appId = $stateParams.appId;
        return $api.apiGet('/app/' + appId).then(function (res) {
          return res.data;
        }).catch(function (err) {
          console.log(err);
          return {};
        });
      }]
    }
  }).state('app.user.app.dashboard', {
    url: '',
    templateUrl: 'modules/appEditor/html/dashboard.html'
  }).state('app.user.app.schemas', {
    url: '/schemas',
    templateUrl: 'modules/appEditor/html/schemas.html'
  }).state('app.user.app.schema', {
    url: '/schema/:schemaId',
    templateUrl: 'modules/appEditor/html/schema.html',
    controller: 'AppSchemaEditorController',
    controllerAs: '$schemaCtrl',
    resolve: {
      schema: ['$api', '$stateParams', function ($api, $stateParams) {
        var appId = $stateParams.appId;
        var schemaId = $stateParams.schemaId;
        return $api.apiGet('/app/' + appId + '/schema/' + schemaId).then(function (res) {
          return res.data;
        }).catch(function (err) {
          console.log(err);
          return {};
        });
      }]
    }
  }).state('app.user.app.apis', {
    url: '/apis',
    templateUrl: 'modules/appEditor/html/apis.html'
  }).state('app.user.app.api', {
    url: '/api/:apiId',
    templateUrl: 'modules/appEditor/html/api.html',
    controller: 'AppApiEditorController',
    controllerAs: '$apiCtrl',
    resolve: {
      api: ['$api', '$stateParams', function ($api, $stateParams) {
        var appId = $stateParams.appId;
        var apiId = $stateParams.apiId;
        return $api.apiGet('/app/' + appId + '/api/' + apiId).then(function (res) {
          return res.data;
        }).catch(function (err) {
          console.log(err);
          return {};
        });
      }],
      routes: ['$api', '$stateParams', function ($api, $stateParams) {
        var apiId = $stateParams.apiId;
        return $api.apiGet('/api/' + apiId + '/routes').then(function (res) {
          return res.data;
        }).catch(function (err) {
          console.log(err);
          return {};
        });
      }],
      operations: ['$api', '$stateParams', function ($api, $stateParams) {
        var apiId = $stateParams.apiId;
        return $api.apiGet('/api/' + apiId + '/operations').then(function (res) {
          var r = {
            all: res.data,
            byRouteId: {},
            orphaned: []
          };
          r.all.forEach(function (d) {
            var routeId = d.RouteId;
            if (!routeId) {
              return r.orphaned.push(d);
            }
            r.byRouteId[routeId] = r.byRouteId[routeId] || [];
            r.byRouteId[routeId].push(d);
          });
          return r;
        }).catch(function (err) {
          console.log(err);
          return {};
        });
      }]
    }
  }).state('app.user.app.clients', {
    url: '/clients',
    templateUrl: 'modules/appEditor/html/clients.html'
  });
}]);
'use strict';

angular.module('DataStudioWebui.User').config(['$stateProvider', function ($stateProvider) {

  $stateProvider.state('app.user', {
    templateUrl: 'modules/user/html/root.html',
    controller: 'UserController',
    controllerAs: '$user',
    abstract: true,
    resolve: {
      userApps: ['$api', function ($api) {
        return $api.apiGet('/apps/all').then(function (res) {
          return res.data;
        }).catch(function (err) {
          console.log(err);
          return [];
        });
      }],
      user: ['$auth', '$api', '$state', function ($auth, $api, $state) {
        try {
          return $api.apiGet('/user/' + $auth.user.Id).then(function (res) {
            return res.data;
          }).catch(function (err) {
            $state.go('app.anon.login');
          });
        } catch (err) {
          $state.go('app.anon.login');
        }
      }]
    }
  });
}]);
'use strict';

angular.module('DataStudioWebui.UserDashboard').config(['$stateProvider', function ($stateProvider) {

  $stateProvider.state('app.user.dashboard', {
    url: '/dashboard',
    templateUrl: 'modules/userDashboard/html/dashboard.html',
    controller: 'DashboardController'
  });
}]);
'use strict';

angular.module('DataStudioWebui.Anon').controller('AnonController', AnonController);

AnonController.$inject = ['$rootScope', '$state', '$auth'];
function AnonController($rootScope, $state, $auth) {

  $rootScope.$on('authorized', function () {
    $state.go('app.user.dashboard');
  });

  if ($auth.isAuthorized) {
    $state.go('app.user.dashboard');
  }
};
'use strict';

angular.module('DataStudioWebui.Anon').controller('LoginController', LoginController);

LoginController.$inject = ['$scope', '$auth', '$state', '$mdDialog', '$login', '$timeout'];
function LoginController($scope, $auth, $state, $mdDialog, $login, $timeout) {

  $scope.error = '';

  $scope.credentials = {
    Login: '',
    Password: ''
  };

  $scope.onSubmit = function ($ev) {

    $ev.preventDefault();

    console.log($ev);

    var Login = $scope.credentials.Login;
    var Password = $scope.credentials.Password;

    $login(Login, Password).then(function () {}).catch(function (err) {
      var errorMsg = '';
      if (err.data && err.data.ErrorMsg) {
        errorMsg = err.data.ErrorMsg;
      }

      $mdDialog.show($mdDialog.alert().parent(angular.element(document.body)).clickOutsideToClose(true).title('Login failed').textContent(errorMsg).ariaLabel('Login error dialog').ok('Got it!').targetEvent($ev));

      $timeout(function () {
        $scope.error = errorMsg[2];
      });
    });
  };
};
'use strict';

angular.module('DataStudioWebui.Anon').controller('SignupController', SignupController);

SignupController.$inject = ['$state', '$scope', '$signup', '$timeout', '$mdDialog'];
function SignupController($state, $scope, $signup, $timeout, $mdDialog) {

  disableSignup();

  $scope.error = '';
  $scope.signupEnabled = true;

  $scope.showProgress = false;

  $scope.newUser = {
    EmailAddress: '',
    Password: ''
  };

  enableSignup();

  $scope.onSubmit = function ($ev) {

    disableSignup();

    $ev.preventDefault();

    showProgressBar();

    var Email = $scope.newUser.EmailAddress;
    var Password = $scope.newUser.Password;

    $signup(Email, Password).then(function () {
      var d = $mdDialog.alert().parent(angular.element(document.body)).clickOutsideToClose(true).title('Success!').textContent('Your account has been created').ariaLabel('Signup success notification').ok('Awesome!').targetEvent($ev);
      $mdDialog.show(d).then(function () {
        $state.go('app.anon.login');
      });
    }).catch(function (errorMsg) {
      hideProgressBar();

      var d = $mdDialog.alert().parent(angular.element(document.body)).clickOutsideToClose(true).title('Signup failed').textContent(errorMsg).ariaLabel('Signup error notification').ok('Got it!').targetEvent($ev);

      $mdDialog.show(d).then(function () {
        enableSignup();
      });

      $timeout(function () {
        $scope.error = errorMsg[2];
      });
    });
  };

  function enableSignup() {
    $scope.signupEnabled = true;
  }

  function disableSignup() {
    $scope.signupEnabled = false;
  }

  function showProgressBar() {
    $scope.showProgress = true;
  }

  function hideProgressBar() {
    $scope.showProgress = false;
  }
};
'use strict';

angular.module('DataStudioWebui.AppEditor').controller('AppApiEditorController', AppApiEditorController);

AppApiEditorController.$inject = ['$api', '$timeout', '$scope', '$state', '$mdDialog', 'api', 'routes', 'operations'];
function AppApiEditorController($api, $timeout, $scope, $state, $mdDialog, api, routes, operations) {

  var $apiCtrl = this;

  $apiCtrl.api = api;

  $apiCtrl.operations = operations;
  $apiCtrl.routes = routes;

  $apiCtrl.showSchemaView = function ($event) {

    var schemaView = {
      controller: 'AppApiSchemaDialogController',
      templateUrl: 'modules/appEditor/html/dialog/viewApiSchema.html',
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true,
      fullscreen: true,
      locals: {
        operations: operations,
        routes: routes
      }
    };

    $mdDialog.show(schemaView).then(function () {}, function () {});
  };

  $apiCtrl.createOperation = function ($event, route) {

    var createApiOperation = {
      controller: 'CreateApiOperationDialogController',
      templateUrl: 'modules/appEditor/html/dialog/createApiOperation.html',
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true,
      fullscreen: true,
      locals: {
        apiRoute: route
      }
    };

    $mdDialog.show(createApiOperation).then(function (data) {
      createOperation(data);
    }, function () {});
  };

  function createOperation(data) {

    data = data || {};

    var route = data._apiRoute;
    var name = data.Name;
    var method = data.Method;

    var routeId = route.Id || null;
    var newOperation = {
      RouteId: routeId,
      Name: name,
      Method: method
    };

    $api.apiPost('/api/' + apiId() + '/operations', newOperation).then(function (res) {
      $timeout(function () {
        Object.assign(newOperation, res.data);
        newOperation.Id = res.data.Id;

        if (null === routeId) {
          return $apiCtrl.operations.orphaned.push(newOperation);
        }

        $apiCtrl.operations.byRouteId[routeId] = $apiCtrl.operations.byRouteId[routeId] || [];
        $apiCtrl.operations.byRouteId[routeId].push(newOperation);
      });
    }).catch(function (err) {
      console.log(err);
    });
  }

  $apiCtrl.createRoute = function ($event) {

    var confirm = $mdDialog.prompt().title('Specify the Route Path').placeholder('/my/api/path').ariaLabel('Route Path').initialValue('/my/api/path').targetEvent($event).ok('Create Route').cancel('Cancel');

    $mdDialog.show(confirm).then(function (path) {
      createRoute(path);
    }, function () {});
  };

  function createRoute(path) {

    var newRoute = {
      Path: path
    };

    $api.apiPost('/api/' + apiId() + '/routes', newRoute).then(function (res) {
      $timeout(function () {
        Object.assign(newRoute, res.data);
        newRoute.Id = res.data.Id;
      });
    }).catch(function (err) {
      console.log(err);
    });

    $apiCtrl.routes.push(newRoute);
  }

  function apiId() {
    return $apiCtrl.api.Id;
  }
}

angular.module('DataStudioWebui.AppEditor').controller('CreateApiOperationDialogController', CreateApiOperationDialogController);

CreateApiOperationDialogController.$inject = ['$scope', '$mdDialog', 'apiRoute'];
function CreateApiOperationDialogController($scope, $mdDialog, apiRoute) {
  $scope.$data = {
    Method: 'get',
    _apiRoute: apiRoute
  };

  $scope.apiRoute = apiRoute;

  $scope.hide = function () {
    $mdDialog.cancel();
  };

  $scope.cancel = function () {
    $mdDialog.cancel();
  };

  $scope.answer = function () {
    $mdDialog.hide($scope.$data);
  };
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

angular.module('DataStudioWebui.AppEditor').factory('ApiSchema', ApiSchemaFactory);

ApiSchemaFactory.$inject = [];
function ApiSchemaFactory() {
  var ApiSchema = function () {
    function ApiSchema(operations, routes) {
      _classCallCheck(this, ApiSchema);

      this.operations = operations;
      this.routes = routes;
    }

    _createClass(ApiSchema, [{
      key: 'toJSON',
      value: function toJSON() {
        var operations = this.operations;
        var routes = this.routes;
        var schema = {};
        var routePaths = {};

        routes.forEach(function (route) {
          var path = route.Path;
          schema[path] = {};
          routePaths[route.Id] = path;
        });

        operations.forEach(function (operation) {
          var targetPath = routePaths[operation.RouteId];
          var pathExists = targetPath in schema;
          if (!pathExists) {
            return;
          }
          schema[targetPath][operation.Method] = {
            operationId: operation.Name
          };
        });

        return schema;
      }
    }]);

    return ApiSchema;
  }();

  ;

  return ApiSchema;
}

angular.module('DataStudioWebui.AppEditor').controller('AppApiSchemaDialogController', AppApiSchemaDialogController);

AppApiSchemaDialogController.$inject = ['ApiSchema', '$scope', '$mdDialog', 'operations', 'routes'];
function AppApiSchemaDialogController(ApiSchema, $scope, $mdDialog, operations, routes) {

  var schema = new ApiSchema(operations.all, routes);

  $scope.schema = JSON.stringify(schema, undefined, '  ');

  $scope.hide = function () {
    $mdDialog.cancel();
  };

  $scope.cancel = function () {
    $mdDialog.cancel();
  };

  $scope.answer = function () {
    $mdDialog.hide();
  };
}
'use strict';

angular.module('DataStudioWebui.AppEditor').controller('AppEditorController', AppEditorController);

AppEditorController.$inject = ['$api', '$timeout', '$scope', '$state', '$mdDialog', 'app'];
function AppEditorController($api, $timeout, $scope, $state, $mdDialog, app) {

  var _app = {
    model: app,
    schemas: app.Schemas,
    apis: app.Apis,
    clients: app.Clients
  };

  $scope.chips = ["Id"];
  $scope.currentNavItem = "overview";

  $scope.go = function (dest) {
    $state.go('app.user.app.' + dest);
  };

  console.log(_app);

  $scope.model = _app.model;
  $scope.schemas = _app.schemas;
  $scope.apis = _app.apis;
  $scope.clients = _app.clients;

  $scope.addApiDialog = function ($event) {
    var confirm = $mdDialog.prompt().title('API Name').textContent('Choose a name for the API').placeholder('e.g. UserApi').ariaLabel('API Name').initialValue('').targetEvent($event).ok('Add API').cancel('Cancel');

    $mdDialog.show(confirm).then(function (result) {

      var appId = $scope.model.Id;

      $api.apiPost('/app/' + appId + '/apis', { Name: result }).then(function (res) {
        $timeout(function () {
          $scope.apis.push(res.data);
        });
      }).catch(function (err) {
        console.log(err);
      });
    }, function () {
      // dialog cancelled
    });
  };
  $scope.addClientDialog = function ($event) {
    var confirm = $mdDialog.prompt().title('Client Name').textContent('Choose a name for the Client').placeholder('e.g. WebClient').ariaLabel('Client Name').initialValue('').targetEvent($event).ok('Add Client').cancel('Cancel');

    $mdDialog.show(confirm).then(function (result) {

      var appId = $scope.model.Id;

      $api.apiPost('/app/' + appId + '/clients', { Name: result }).then(function (res) {
        $timeout(function () {
          $scope.clients.push(res.data);
        });
      }).catch(function (err) {
        console.log(err);
      });
    }, function () {
      // dialog cancelled
    });
  };
  $scope.addSchemaDialog = function ($event) {
    var confirm = $mdDialog.prompt().title('Schema Name').textContent('Choose a name for the Schema').placeholder('e.g. UserProfile').ariaLabel('Schema Name').initialValue('').targetEvent($event).ok('Add Schema').cancel('Cancel');

    $mdDialog.show(confirm).then(function (result) {

      var appId = $scope.model.Id;

      $api.apiPost('/app/' + appId + '/schemas', { Name: result }).then(function (res) {
        $timeout(function () {
          $scope.schemas.push(res.data);
        });
      }).catch(function (err) {
        console.log(err);
      });
    }, function () {
      // dialog cancelled
    });
  };
};
'use strict';

angular.module('DataStudioWebui.AppEditor').controller('AppSchemaEditorController', AppSchemaEditorController);

AppSchemaEditorController.$inject = ['$api', '$timeout', '$scope', '$state', '$mdDialog', 'schema'];
function AppSchemaEditorController($api, $timeout, $scope, $state, $mdDialog, schema) {

  var $schemaCtrl = this;

  var STRING = 'string';

  $schemaCtrl.schema = schema;
  $schemaCtrl.properties = [{ Key: 'Id', Type: STRING, Format: 'uuid' }, { Key: 'Name', Type: STRING }];
}
'use strict';

angular.module('DataStudioWebui.User').controller('LayoutController', LayoutController);

LayoutController.$inject = ['$scope', '$mdDialog', '$logout', '$mdSidenav'];
function LayoutController($scope, $mdDialog, $logout, $mdSidenav) {

  var originatorEv = void 0;

  $scope.toggleSidenav = function (menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.changePassword = function () {
    $mdToast.show($mdToast.simple().content('Password clicked!').position('top right').hideDelay(2000));
  };

  $scope.changeProfile = function (ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'app/modules/layouts/main-page/user-dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    }).then(function (answer) {
      $mdToast.show($mdToast.simple().content('You said the information was "' + answer + '".').position('top right').hideDelay(2000));
    }, function () {
      $mdToast.show($mdToast.simple().content('You cancelled the dialog.').position('top right').hideDelay(2000));
    });

    function DialogController($scope, $mdDialog) {
      $scope.hide = function () {
        $mdDialog.hide();
      };

      $scope.cancel = function () {
        $mdDialog.cancel();
      };

      $scope.answer = function (answer) {
        $mdDialog.hide(answer);
      };
    }
  };

  $scope.logout = function () {
    $logout();
  };

  $scope.openMenu = function ($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };
};
'use strict';

angular.module('DataStudioWebui.User').controller('SidenavController', SidenavController);

SidenavController.$inject = ['$scope', '$mdSidenav'];
function SidenavController($scope, $mdSidenav) {

  $scope.toggleSidenav = function (menuId) {
    $mdSidenav(menuId).toggle();
  };
};
'use strict';

angular.module('DataStudioWebui.User').controller('UserController', UserController);

UserController.$inject = ['$api', '$scope', '$rootScope', '$auth', '$state', '$mdDialog', '$timeout', 'user', 'userApps'];
function UserController($api, $scope, $rootScope, $auth, $state, $mdDialog, $timeout, user, userApps) {

  $rootScope.$on('unauthorized', function () {
    $state.go('app.anon.login');
  });

  if (!$auth.isAuthorized) {
    $state.go('app.anon.login');
  }

  $scope.showSidenavApps = true;
  $scope.apps = userApps;
  $scope.user = user;

  $scope.login = user.Login;

  $scope.createApp = function ($event) {

    var confirm = $mdDialog.prompt().title('Name your new app').placeholder('My First App').ariaLabel('App name').initialValue('My First App').targetEvent($event).ok('Create App').cancel('Cancel');

    $mdDialog.show(confirm).then(function (result) {
      createApp(result);
    }, function () {});
  };

  function createApp(name) {

    var newApp = {
      Name: name
    };

    $api.apiPost('/apps', newApp).then(function (res) {
      $timeout(function () {
        Object.assign(newApp, res.data);
        newApp.Id = res.data.Id;
      });
    }).catch(function (err) {
      console.log(err);
    });

    $scope.apps.push(newApp);
  }
};
'use strict';

angular.module('DataStudioWebui.UserDashboard').controller('DashboardController', DashboardController);

DashboardController.$inject = ['$scope', '$mdDialog', 'userApps'];
function DashboardController($scope, $mdDialog, userApps) {

  $scope.apps = userApps;
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

angular.module('DataStudioWebui.Api').factory('$api', dsApiFactory);

dsApiFactory.$inject = ['$auth', '$appEnvironment', '$http'];
function dsApiFactory($auth, $appEnvironment, $http) {

  var POST = "post";
  var GET = "get";

  var DsApi = function () {
    function DsApi() {
      _classCallCheck(this, DsApi);

      this.url = $appEnvironment.config.apiUrl;
    }

    _createClass(DsApi, [{
      key: 'apiGet',
      value: function apiGet(url) {
        var _this = this;

        var dsApi = this;
        return new Promise(function (resolve, reject) {
          var authorization = _this.authorization;
          var opts = {
            method: GET,
            url: dsApi.url + url,
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            }
          };

          if (hasAuthorization()) {
            opts.headers['Authorization'] = getAuthorization();
          }

          $http(opts).then(resolve, reject);
        });
      }
    }, {
      key: 'apiPost',
      value: function apiPost(url, d) {
        var _this2 = this;

        var dsApi = this;
        return new Promise(function (resolve, reject) {
          var authorization = _this2.authorization;
          var opts = {
            method: POST,
            url: dsApi.url + url,
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            }
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
    }]);

    return DsApi;
  }();

  return new DsApi();

  function hasAuthorization() {
    return $auth.isAuthorized;
  }
  function getAuthorization() {
    return $auth.authorization;
  }
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

angular.module('DataStudioWebui.Api').factory('$auth', dsAuthFactory);

dsAuthFactory.$inject = ['User', 'Token', '$rootScope', 'clientStore'];
function dsAuthFactory(User, Token, $rootScope, clientStore) {
  var Auth = function () {
    function Auth() {
      _classCallCheck(this, Auth);

      this.isAuthorized = false;
      this.token = null;
      this.user = null;
    }

    _createClass(Auth, [{
      key: 'auth',
      value: function auth(key) {
        this.token = new Token(key);
        this.user = new User(this.token.UserId);
        this.isAuthorized = true;
        clientStore.setStoredToken(key);
        $rootScope.$emit('authorized');
        return this;
      }
    }, {
      key: 'remove',
      value: function remove() {
        this.token = null;
        this.user = null;
        this.isAuthorized = false;
        clientStore.clearStoredToken();
        $rootScope.$emit('unauthorized');
        return this;
      }
    }, {
      key: 'authorization',
      get: function get() {
        if (null === this.token) {
          return '';
        }
        return this.token.Key;
      }
    }]);

    return Auth;
  }();

  return new Auth();
}
'use strict';

angular.module('DataStudioWebui.Api').factory('$login', dsLoginFactory);

dsLoginFactory.$inject = ['$auth', '$api'];
function dsLoginFactory($auth, $api) {
  return function (Login, Password) {
    return new Promise(function (resolve, reject) {
      $api.apiPost('/auth/attempts', {
        Login: Login,
        Password: Password
      }).then(function (res) {
        var token = res.data.Token;
        if (token) {
          $auth.auth(token.Key);
          return resolve();
        }
        reject(new Error(res.data.Error));
      }).catch(reject);
    });
  };
};
'use strict';

angular.module('DataStudioWebui.Api').factory('$logout', dsLogoutFactory);

dsLogoutFactory.$inject = ['$auth', '$api'];
function dsLogoutFactory($auth, $api) {
  return function () {
    return new Promise(function (resolve, reject) {
      // $api.apiPost('/logout', {})
      //   .then((res) => {
      $auth.remove();
      return resolve();
      // })
      // .catch(reject);
    });
  };
};
'use strict';

angular.module('DataStudioWebui.Api').factory('$signup', dsSignupFactory);

dsSignupFactory.$inject = ['$auth', '$api'];
function dsSignupFactory($auth, $api) {
  return function (Email, NewPassword) {
    return new Promise(function (resolve, reject) {
      $api.apiPost('/signups', {
        Email: Email,
        NewPassword: NewPassword
      }).then(function (res) {
        if (202 === res.status) {
          return resolve();
        }
        reject(new Error(res.data.Error || "UNKNOWN_ERROR_408392"));
      }).catch(function (res) {
        if (400 === res.status) {
          return reject(res.data.ErrorMsg);
        }
        console.log(res);
        reject(new Error("UNKNOWN_ERROR_408393"));
      });
    });
  };
};
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

angular.module('DataStudioWebui.Api').factory('Token', TokenFactory);

TokenFactory.$inject = [];
function TokenFactory() {
  var Token = function Token(key) {
    _classCallCheck(this, Token);

    var keyParts = key.split(/\//g);

    this.Key = key;
    this.Id = keyParts[0];
    this.UserId = keyParts[1];
    this.Created = keyParts[2];
  };

  return Token;
}
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

angular.module('DataStudioWebui.Api').factory('User', UserFactory);

UserFactory.$inject = [];
function UserFactory() {
  var User = function User(Id) {
    _classCallCheck(this, User);

    this.Id = Id;
    this.Login = null;

    this.Apps = [];
  };

  return User;
}
'use strict';

angular.module('DataStudioWebui').run(['$templateCache', function ($templateCache) {
  $templateCache.put('modules/anon/html/login.html', '<div id="login" layout="column" layout-fill layout-align="center center">\n  <div class="login-form form-wrapper" layout="column" md-whiteframe="12dp">\n\n    <header layout="row" layout-align="start center">\n\n      <img src="https://s3-ap-southeast-2.amazonaws.com/data-studio/pub/assets/data-studio.png" class="app-logo" />\n\n      <div flex layout="column">\n        <span class="md-headline">DataStudio</span>\n        <span class="md-subhead">User Login</span>\n      </div>\n\n    </header>\n\n    <form layout="column"\n      ng-controller="LoginController"\n      ng-submit="onSubmit($event)">\n\n      <div class="login-error"\n        ng-if="error">\n        <strong>Login failed:</strong>\n        {{ error }}\n      </div>\n\n      <md-content layout="column">\n\n        <md-input-container>\n          <label>Username / Email</label>\n          <input ng-model="credentials.Login" required ng-minlength="5" />\n        </md-input-container>\n\n        <md-input-container>\n          <label>Password</label>\n          <input ng-model="credentials.Password" type="password" required ng-minlength="7" />\n        </md-input-container>\n\n      </md-content>\n\n      <div class="submit-row" layout="row" layout-align="end center">\n        <!-- <a class="md-button" href="#">Forgot Password</a> -->\n        <md-button class="md-primary md-raised" type="submit">\n          Login\n        </md-button>\n      </div>\n\n    </form>\n\n  </div>\n  <div class="new-user-banner" layout="row" layout-align="start center" md-whiteframe="12dp">\n    <strong>New, here?</strong>\n    <span>It\'s free to signup</span>\n    <span flex></span>\n    <a class="md-button" ui-sref="app.anon.signup">Sign-up</a>\n  </div>\n</div>\n');
  $templateCache.put('modules/anon/html/root.html', '<div ui-view layout layout-fill></div>\n');
  $templateCache.put('modules/anon/html/signup.html', '<div id="signup" layout layout-fill layout-align="center center">\n  <div class="signup-form form-wrapper" layout="column" md-whiteframe="12dp">\n\n    <header layout="row" layout-align="start center">\n\n      <img src="https://s3-ap-southeast-2.amazonaws.com/data-studio/pub/assets/data-studio.png" class="app-logo" />\n\n      <div flex layout="column">\n        <span class="md-caption">DataStudio</span>\n        <span class="md-headline">User Signup</span>\n      </div>\n\n    </header>\n\n    <form name="signupForm" layout="column" ng-submit="onSubmit($event)"\n      ng-controller="SignupController">\n\n      <md-content layout="column">\n\n        <md-input-container>\n          <label>Email Address</label>\n          <input name="emailAddress"\n            ng-model="newUser.EmailAddress"\n            required\n            type="email"\n            ng-disabled="inputDisabled" />\n          <div ng-messages="signupForm.emailAddress.$error">\n            <div ng-message="required">A valid email address is required.</div>\n          </div>\n        </md-input-container>\n\n        <md-input-container>\n          <label>Password</label>\n          <input name="password"\n            ng-model="newUser.Password"\n            required\n            type="password"\n            ng-pattern="/^.{7,}$/"\n            ng-disabled="inputDisabled" />\n          <div ng-messages="signupForm.password.$error"\n            md-auto-hide="true"\n            multiple>\n            <div ng-message="required">Password is required.</div>\n            <div ng-message="pattern">Password must be at least 7 characters</div>\n          </div>\n        </md-input-container>\n\n      </md-content>\n\n      <div class="submit-row" layout="row" layout-align="end center">\n        <md-button class="md-primary md-raised" type="submit" ng-disabled="submitDisabled">\n          Create my account\n        </md-button>\n      </div>\n\n      <md-progress-linear md-mode="indeterminate" ng-if="showProgress"></md-progress-linear>\n\n    </form>\n\n  </div>\n</div>\n');
  $templateCache.put('modules/app/html/app.html', '<div ui-view layout layout-fill></div>\n');
  $templateCache.put('modules/appEditor/html/api.html', '<div class="app-apis"\n  layout="row"\n  layout-xs="column">\n\n  <div flex>\n\n    <div style="border-bottom: 1px solid rgba(0,0,0,0.12);margin:24px 8px 8px;padding:0 8px;"\n      layout="row"\n      layout-align="start center">\n      <md-card-header-text>\n        <span class="md-headline">\n          <span style="font-weight:300;color:rgba(0,0,0,0.5);">API /</span>\n          {{ $apiCtrl.api.Name }}\n        </span>\n      </md-card-header-text>\n      <span flex></span>\n      <md-button ng-click="$apiCtrl.showSchemaView($event)">\n        <md-icon class="material-icons">file_download</md-icon>\n        Schema\n      </md-button>\n      <md-button ng-click="$apiCtrl.createRoute($event)">\n        <md-icon class="material-icons">add</md-icon>\n        Route\n      </md-button>\n    </div>\n\n    <div layout="row"\n      layout-align="start start"\n      layout-wrap>\n\n      <md-card ng-if="0 === $apiCtrl.routes.length"\n        flex>\n        <md-card-content style="padding:0;">\n          <div style="padding: 40px 16px;text-align: center;">\n            Add an API Route to make a start\n          </div>\n        </md-card-content>\n      </md-card>\n\n      <div ng-if="$apiCtrl.routes.length > 0"\n        flex>\n        <div layout="column">\n          <div class="api-route-list">\n            <md-card ng-repeat="route in $apiCtrl.routes">\n              <md-card-content style="padding:0;">\n                <div class="api-route">\n\n                  <div class="api-route-header"\n                    layout="row"\n                    layout-align="start center">\n                    <span class="md-body-1">{{ route.Path }}</span>\n                  </div>\n\n                  <md-divider></md-divider>\n\n                  <div class="api-route-wrapper"\n                    layout="row"\n                    layout-wrap="true"\n                    layout-xs="column"\n                    layout-align="start center"\n                    layout-align-xs="start stretch">\n\n                    <div class="api-operation"\n                      ng-repeat="operation in $apiCtrl.operations.byRouteId[route.Id]"\n                      md-whiteframe="1dp"\n                      layout="row"\n                      layout-align="start center"\n                      flex-xs\n                      flex-gt-xs="30">\n                      <span class="md-caption http-method http-{{ operation.Method.toLowerCase() }}">\n                        {{ operation.Method }}\n                      </span>\n                      <span class="md-body-1">{{ operation.Name }}</span>\n                      <span flex></span>\n                      <md-menu class="md-secondary">\n                        <md-button class="md-icon-button">\n                          <md-icon class="material-icons">\n                            chevron_right\n                          </md-icon>\n                        </md-button>\n                        <md-menu-content width="4">\n                          <md-menu-item>\n                            <md-button>\n                              Re-name\n                            </md-button>\n                          </md-menu-item>\n                          <md-menu-item>\n                            <md-button>\n                              View details\n                            </md-button>\n                          </md-menu-item>\n                          <md-menu-divider></md-menu-divider>\n                          <md-menu-item>\n                            <md-button>\n                              Delete operation\n                            </md-button>\n                          </md-menu-item>\n                        </md-menu-content>\n                      </md-menu>\n                    </div>\n\n                    <div class="inline-create-btn-wrapper"\n                      layout="row"\n                      layout-align="start center"\n                      flex-xs\n                      flex-gt-xs="30">\n                      <md-button ng-click="$apiCtrl.createOperation($event, route)"\n                        class="md-no-style"\n                        style="margin-top:0;margin-bottom:0;"\n                        flex>\n                        <md-icon class="material-icons">add</md-icon>\n                        <span>API operation</span>\n                      </md-button>\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </md-card-content>\n            </md-card>\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>\n\n  <div class="api-side" flex-gt-xs="30" flex-xs>\n    <md-list>\n      <md-subheader>API Menu</md-subheader>\n      <md-list-item ng-click="$apiCtrl.showSchemaView($event)">\n          <md-icon class="material-icons">chevron_right</md-icon>\n          <p>Export spec ...</p>\n      </md-list-item>\n      <md-list-item ng-click="null">\n          <md-icon class="material-icons">chevron_right</md-icon>\n          <p>Import spec ...</p>\n      </md-list-item>\n      <md-divider></md-divider>\n      <md-list-item ng-click="null">\n          <md-icon class="material-icons">chevron_right</md-icon>\n          <p>Generate tests</p>\n      </md-list-item>\n      <md-divider></md-divider>\n      <md-list-item ng-click="null">\n          <md-icon class="material-icons">chevron_right</md-icon>\n          <p>Clone / copy</p>\n      </md-list-item>\n      <md-list-item ng-click="null">\n          <md-icon class="material-icons">chevron_right</md-icon>\n          <p>Delete API</p>\n      </md-list-item>\n      <md-subheader>App APIs</md-subheader>\n      <md-list-item ng-repeat="api in apis" ui-sref="app.user.app.api({ appId: model.Id, apiId: api.Id})">\n          <md-icon class="material-icons">chevron_right</md-icon>\n          <p>{{ api.Name }}</p>\n      </md-list-item>\n    </md-list>\n  </div>\n\n</div>\n');
  $templateCache.put('modules/appEditor/html/apis.html', '<div class="app-apis"\n  layout="row"\n  layout-fill>\n\n  <div style="padding:8px;"\n    flex\n    layout>\n\n    <div class=""\n      style="border-radius:3px;border:2px dashed rgba(0,0,0,0.12);padding:8px;"\n      layout-align="center center"\n      layout-fill\n      layout="column">\n\n      <div class="md-display-1"\n        style="margin-bottom: 1em;">\n        App APIs\n      </div>\n\n      <md-button class="md-primary md-raised"\n        ng-click="addSchemaDialog($event)">\n        Create a new API\n      </md-button>\n\n    </div>\n\n  </div>\n\n  <div class="api-side" flex="30">\n    <md-list>\n      <md-subheader>App APIs</md-subheader>\n      <md-list-item ng-repeat="api in apis" ui-sref="app.user.app.api({ appId: model.Id, apiId: api.Id})">\n          <md-icon class="material-icons">chevron_right</md-icon>\n          <p>{{ api.Name }}</p>\n      </md-list-item>\n    </md-list>\n  </div>\n\n</div>\n');
  $templateCache.put('modules/appEditor/html/clients.html', '<div class="app-clients"\n  layout="row"\n  layout-fill>\n\n  <div style="padding:8px;"\n    flex\n    layout>\n\n    <div class=""\n      style="border-radius:3px;border:2px dashed rgba(0,0,0,0.12);padding:8px;"\n      layout-align="center center"\n      layout-fill\n      layout="column">\n\n      <div class="md-display-1"\n        style="margin-bottom: 1em;">\n        App API Clients\n      </div>\n\n      <md-button class="md-primary md-raised"\n        ng-click="addSchemaDialog($event)">\n        Create a new Client\n      </md-button>\n\n    </div>\n\n  </div>\n\n  <div class="client-side" flex="30">\n    <md-list>\n      <md-subheader>App Clients</md-subheader>\n      <md-list-item ng-repeat="client in clients" ui-sref="app.user.app.client({ appId: model.Id, clientId: client.Id})">\n        <md-icon class="material-icons">chevron_right</md-icon>\n        <p>{{ client.Name }}</p>\n      </md-list-item>\n    </md-list>\n  </div>\n\n</div>\n');
  $templateCache.put('modules/appEditor/html/dashboard.html', '<div class="app-dashboard-cards" layout="row" layout-xs="column">\n\n  <div flex>\n    <div layout="row"\n      layout-xs="column"\n      layout-align-xs="center stretch"\n      layout-wrap>\n      <div flex-gt-xs="50">\n        <div>\n          <md-card>\n            <md-card-header style="background-color:#F5F5F5;">\n              <md-card-avatar>\n                <md-icon class="material-icons">\n                  description\n                </md-icon>\n              </md-card-avatar>\n              <md-card-header-text>\n                <span class="md-title">Schemas</span>\n                <span class="md-subhead">Data Types</span>\n              </md-card-header-text>\n              <md-button style="margin: 0;" class="md-icon-button" ng-click="addSchemaDialog($event)">\n                <md-icon class="material-icons">add</md-icon>\n              </md-button>\n            </md-card-header>\n            <md-divider></md-divider>\n            <div ng-if="0 === schemas.length">\n              <div class="empty-card-filler"\n                layout="column"\n                layout-align="center center">\n                <span>&#9733; {{ model.Name }} &#9733;</span>\n                <md-button class="md-accent"\n                  ng-click="addSchemaDialog($event)">\n                  <md-icon class="material-icons">add</md-icon>\n                  Add App Schema\n                </md-button>\n              </div>\n            </div>\n            <md-list ng-if="schemas.length > 0">\n              <md-list-item ng-repeat="schema in schemas" layout="row"\n                ui-sref="app.user.app.schema({ appId: model.Id, schemaId: schema.Id})">\n                <span flex>{{ schema.Name }}</span>\n              </md-list-item>\n            </md-list>\n          </md-card>\n        </div>\n      </div>\n\n      <div flex-gt-xs="50">\n        <div>\n          <md-card>\n            <md-card-header style="background-color:#F5F5F5;">\n              <md-card-avatar>\n                <md-icon class="material-icons">\n                  dashboard\n                </md-icon>\n              </md-card-avatar>\n              <md-card-header-text>\n                <span class="md-title">APIs</span>\n                <span class="md-subhead">For Developers</span>\n              </md-card-header-text>\n              <md-button style="margin: 0;" class="md-icon-button" ng-click="addApiDialog($event)">\n                <md-icon class="material-icons">add</md-icon>\n              </md-button>\n            </md-card-header>\n            <md-divider></md-divider>\n            <div ng-if="0 === apis.length">\n              <div class="empty-card-filler"\n                layout="column"\n                layout-align="center center">\n                <span>&#9733; {{ model.Name }} &#9733;</span>\n                <md-button class="md-accent"\n                  ng-click="addApiDialog($event)">\n                  <md-icon class="material-icons">add</md-icon>\n                  Add App API\n                </md-button>\n              </div>\n            </div>\n            <md-list ng-if="apis.length > 0">\n              <md-list-item ng-repeat="api in apis" layout="row"\n                ui-sref="app.user.app.api({ appId: model.Id, apiId: api.Id})">\n                <span flex>{{ api.Name }}</span>\n                <span class="md-caption" style="color:rgba(0,0,0,0.57);">{{ api.CurrentStable }}</span>\n              </md-list-item>\n            </md-list>\n          </md-card>\n        </div>\n\n        <div>\n          <md-card>\n            <md-card-header style="background-color:#F5F5F5;">\n              <md-card-avatar>\n                <md-icon class="material-icons">\n                  web\n                </md-icon>\n              </md-card-avatar>\n              <md-card-header-text>\n                <span class="md-title">Clients</span>\n                <span class="md-subhead">For Users</span>\n              </md-card-header-text>\n              <md-button style="margin: 0;" class="md-icon-button" ng-click="addClientDialog($event)">\n                <md-icon class="material-icons">add</md-icon>\n              </md-button>\n            </md-card-header>\n            <md-divider></md-divider>\n            <div ng-if="0 === clients.length">\n              <div class="empty-card-filler"\n                layout="column"\n                layout-align="center center">\n                <span>&#9733; {{ model.Name }} &#9733;</span>\n                <md-button class="md-accent"\n                  ng-click="addClientDialog($event)">\n                  <md-icon class="material-icons">add</md-icon>\n                  Add App Client\n                </md-button>\n              </div>\n            </div>\n            <md-list ng-if="clients.length > 0">\n              <md-list-item ng-repeat="client in clients" layout="row"\n                ui-sref="app.user.app.client({ appId: model.Id, clientId: client.Id})">\n                <span flex>{{ client.Name }}</span>\n                <span class="md-caption" style="color:rgba(0,0,0,0.57);">{{ client.CurrentStable }}</span>\n              </md-list-item>\n              <div>\n                {{ client.Name }}\n              </div>\n            </md-list>\n          </md-card>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class="dashboard-side" flex-gt-xs="30">\n    <md-list>\n      <md-subheader>App actions</md-subheader>\n      <md-list-item ng-click="addSchemaDialog($event)">\n        <md-icon class="material-icons">add</md-icon>\n        <p>Create new Schema</p>\n      </md-list-item>\n      <md-list-item ng-click="addApiDialog($event)">\n        <md-icon class="material-icons">add</md-icon>\n        <p>Create new API</p>\n      </md-list-item>\n      <md-list-item ng-click="addClientDialog($event)">\n        <md-icon class="material-icons">add</md-icon>\n        <p>Create new Client</p>\n      </md-list-item>\n      <md-divider></md-divider>\n      <md-list-item ng-click="null">\n        <md-icon class="material-icons">file_download</md-icon>\n        <p>Download Project</p>\n      </md-list-item>\n    </md-list>\n  </div>\n\n</div>\n');
  $templateCache.put('modules/appEditor/html/root.html', '<div id="appEditor" layout="column" flex>\n\n  <header>\n    <span class="md-headline">\n      <span style="font-weight:300;color:rgba(255,255,255,0.5);">App /</span>\n      {{ model.Name }}\n    </span>\n  </header>\n\n  <md-nav-bar\n    md-theme="darknav"\n    md-selected-nav-item="currentNavItem"\n    nav-bar-aria-label="navigation links">\n    <md-nav-item md-nav-click="go(\'dashboard\')" name="overview">\n      App Dashboard\n    </md-nav-item>\n    <md-nav-item md-nav-click="go(\'schemas\')" name="schemas">\n      Schemas\n    </md-nav-item>\n    <md-nav-item md-nav-click="go(\'apis\')" name="apis">\n      APIs\n    </md-nav-item>\n    <md-nav-item md-nav-click="go(\'clients\')" name="clients">\n      Clients\n    </md-nav-item>\n  </md-nav-bar>\n\n  <div flex ui-view></div>\n\n</div>\n');
  $templateCache.put('modules/appEditor/html/schema.html', '<div class="app-schemas" layout="row">\n\n  <div flex>\n    <md-card>\n      <md-card-header>\n        <md-card-avatar>\n          <md-icon class="md-avatar-icon" md-svg-icon="img/icons/menu.svg"></md-icon>\n        </md-card-avatar>\n        <md-card-header-text>\n          <span class="md-title">{{$schemaCtrl.schema.Name}}</span>\n          <span class="md-subhead">Schema Editor</span>\n        </md-card-header-text>\n      </md-card-header>\n      <md-card-content md-no-padding>\n        <div layout="column">\n          <div class=""\n            ng-repeat="property in $schemaCtrl.properties">\n            <div layout="row" layout-align="start" flex>\n              <md-input-container flex="20">\n                <input type="text" ng-model="property.Key">\n              </md-input-container>\n                <md-select ng-model="property.Type" required>\n                  <md-option value="string">String</md-option>\n                  <md-option value="number">Number</md-option>\n                  <md-option value="boolean">Boolean</md-option>\n                </md-select>\n                <md-select ng-model="property.Format">\n                  <md-option value=""></md-option>\n                  <md-option value="email">Email</md-option>\n                  <md-option value="uuid">UUID</md-option>\n                </md-select>\n            </div>\n            <div layout="row" layout-align="start">\n              <md-checkbox ng-model="property.required">Required</md-checkbox>\n              <md-checkbox ng-model="myForm.$dirty">Form Dirty</md-checkbox>\n              <md-checkbox ng-model="myForm.$submitted">Form Submitted</md-checkbox>\n              <md-checkbox ng-model="myForm.favoriteColor.$touched">Select Touched</md-checkbox>\n            </div>\n          </div>\n        </div>\n      </md-card-content>\n    </md-card>\n  </div>\n\n  <div class="schema-side" flex="30">\n    <md-list>\n      <md-subheader>App Schemas</md-subheader>\n      <md-list-item ng-repeat="schema in schemas" ui-sref="app.user.app.schema({ appId: model.Id, schemaId: schema.Id})">\n          <md-icon class="material-icons">chevron_right</md-icon>\n          <p>{{ schema.Name }}</p>\n      </md-list-item>\n    </md-list>\n  </div>\n\n</div>\n');
  $templateCache.put('modules/appEditor/html/schemas.html', '<div class="app-schemas"\n  layout="row"\n  layout-fill>\n\n  <div style="padding:8px;"\n    flex\n    layout>\n\n    <div class=""\n      style="border-radius:3px;border:2px dashed rgba(0,0,0,0.12);padding:8px;"\n      layout-align="center center"\n      layout-fill\n      layout="column">\n\n      <div class="md-display-1"\n        style="margin-bottom: 1em;">\n        App Schemas\n      </div>\n\n      <md-button class="md-primary md-raised"\n        ng-click="addSchemaDialog($event)">\n        Create a new Schema\n      </md-button>\n\n    </div>\n\n  </div>\n\n  <div class="schema-side" flex="30">\n    <md-list>\n      <md-subheader>App Schemas</md-subheader>\n      <md-list-item ng-repeat="schema in schemas" ui-sref="app.user.app.schema({ appId: model.Id, schemaId: schema.Id})">\n          <md-icon class="material-icons">chevron_right</md-icon>\n          <p>{{ schema.Name }}</p>\n      </md-list-item>\n    </md-list>\n  </div>\n\n</div>\n');
  $templateCache.put('modules/user/html/root.html', '<md-sidenav class="md-sidenav-left md-whiteframe-z2"\n  layout="column"\n  md-theme="sidenavTheme"\n  md-component-id="left"\n  md-is-locked-open="$mdMedia(\'gt-md\')">\n\n  <div ng-controller="SidenavController as $sidenav"\n    ng-cloak>\n\n    <header layout="row" layout-align="start center">\n\n      <img src="https://s3-ap-southeast-2.amazonaws.com/data-studio/pub/assets/data-studio.png" class="app-logo" />\n\n      <div flex layout="column">\n        <span class="md-headline">DataStudio</span>\n        <span class="md-caption">eviratec.software</span>\n      </div>\n\n    </header>\n\n    <md-list>\n      <md-list-item ui-sref="app.user.dashboard"\n        ng-click="toggleSidenav(\'left\')">\n        <md-icon class="material-icons">\n          apps\n        </md-icon>\n        <p>Dashboard</p>\n      </md-list-item>\n\n      <md-divider></md-divider>\n\n      <md-subheader ng-click="showSidenavApps=!showSidenavApps">\n        My Apps\n      </md-subheader>\n\n      <md-list-item ui-sref-active="active"\n        ui-sref="app.user.app.dashboard({ appId: app.Id })"\n        ng-repeat="app in apps"\n        ng-if="showSidenavApps"\n        ng-click="toggleSidenav(\'left\')">\n        <md-icon class="material-icons">\n          folder\n        </md-icon>\n        <p>{{ app.Name }}</p>\n      </md-list-item>\n\n      <md-list-item\n        ng-click="createApp()"\n        ng-if="showSidenavApps"\n        ng-click="toggleSidenav(\'left\')">\n        <md-icon class="material-icons">\n          create\n        </md-icon>\n        <p>Create an App</p>\n      </md-list-item>\n\n    </md-list>\n  </div>\n</md-sidenav>\n\n<div class="relative"\n  layout="column"\n  role="main"\n  ng-controller="LayoutController"\n  layout-fill\n  ng-cloak>\n  <md-toolbar id="userToolbar">\n    <div class="md-toolbar-tools">\n\n      <img class="logo"\n        src="https://s3-ap-southeast-2.amazonaws.com/data-studio/pub/assets/data-studio.png" />\n\n      <h3 class="md-caption"\n        ng-if="$mdMedia(\'gt-xs\')">\n        DataStudio\n      </h3>\n\n      <span flex></span>\n\n      <md-menu>\n        <!-- trigger -->\n        <md-button\n          aria-label="Open Settings"\n          ng-click="openMenu($mdOpenMenu, $event)">\n          <md-icon class="material-icons">\n            person\n          </md-icon>\n          <span class="md-caption"\n            md-show-gt-xs>\n            {{ login }}\n          </span>\n          <md-icon class="material-icons">\n            arrow_drop_down\n          </md-icon>\n        </md-button>\n        <!-- content -->\n        <md-menu-content width="4">\n          <md-menu-item>\n            <md-button ng-click="changeProfile($event)">\n              <md-icon>face</md-icon>\n              Profile\n            </md-button>\n          </md-menu-item>\n          <md-menu-item>\n            <md-button ng-click="changePassword()">\n              <md-icon>lock</md-icon>\n              Password\n            </md-button>\n          </md-menu-item>\n          <md-menu-divider></md-menu-divider>\n          <md-menu-item>\n            <md-button ng-click="logout()">\n              <md-icon>power_settings_new</md-icon>\n              Logout\n            </md-button>\n          </md-menu-item>\n        </md-menu-content>\n      </md-menu>\n\n      <md-button class="md-icon-button"\n        aria-label="Menu"\n        ng-click="toggleSidenav(\'left\')"\n        hide-gt-md>\n        <md-icon class="material-icons">\n          menu\n        </md-icon>\n      </md-button>\n    </div>\n  </md-toolbar>\n\n  <md-content class="ds-main-content"\n    layout="column"\n    md-scroll-y\n    flex>\n    <div layout="column"\n      layout-fill\n      ui-view>\n    </div>\n  </md-content>\n\n</div>\n');
  $templateCache.put('modules/userDashboard/html/dashboard.html', '<div layout="row"\n  flex>\n\n  <div class="user-dashboard"\n    style="margin: 8px;"\n    flex>\n\n    <div layout="column">\n\n      <div>\n        <div layout="row" layout-align="start center">\n          <h2 class="md-display-1"\n            style="padding-left: 16px;">\n            My Apps\n          </h2>\n        </div>\n      </div>\n\n      <div layout="row" layout-xs="column" layout-wrap>\n        <div flex-gt-xs="33" ng-repeat="app in apps">\n          <md-card>\n            <md-card-header ui-sref="app.user.app.dashboard({ appId: app.Id })">\n              <md-card-avatar>\n                <md-icon ng-if="!app.IconUrl" class="material-icons">\n                  webui\n                </md-icon>\n                <img ng-if="app.IconUrl" src="{{ app.IconUrl }}" />\n              </md-card-avatar>\n              <md-card-header-text>\n                <span class="md-title">{{ app.Name }}</span>\n                <span class="md-subhead">DataStudio App</span>\n              </md-card-header-text>\n            </md-card-header>\n            <md-divider></md-divider>\n            <md-card-actions layout="row" layout-align="end center">\n              <md-button class="md-primary"\n                ui-sref="app.user.app.dashboard({ appId: app.Id })">\n                <md-icon class="material-icons">\n                  edit\n                </md-icon>\n                Edit App\n              </md-button>\n            </md-card-actions>\n          </md-card>\n        </div>\n        <div flex-gt-xs="33">\n          <div class="create-app-card" layout="column" layout-align="center center">\n            <span>New app?</span>\n            <md-button class="md-raised md-primary"\n              ng-click="createApp()">\n              <md-icon class="material-icons">\n                create\n              </md-icon>\n              Create a new App\n            </md-button>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n  </div>\n\n</div>\n');
  $templateCache.put('modules/appEditor/html/dialog/createApiOperation.html', '<md-dialog id="Dialog_CreateApiOperation"\n  aria-label="Create Operation Form">\n  <form name="createOperationForm" ng-cloak>\n    <md-toolbar>\n      <div class="md-toolbar-tools">\n        <h2>Create API Operation</h2>\n        <span flex></span>\n        <md-button class="md-icon-button" ng-click="cancel()">\n          <md-icon class="material-icons" aria-label="Close dialog">\n            close\n          </md-icon>\n        </md-button>\n      </div>\n    </md-toolbar>\n\n    <md-dialog-content>\n      <div class="md-dialog-content" layout="column">\n        <md-input-container>\n          <label>Route Path</label>\n          <input ng-model="apiRoute.Path" readonly>\n        </md-input-container>\n        <div layout="row" layout-xs="column" layout-align="start start" layout-align-xs="start stretch">\n          <md-input-container style="min-width: 100px;">\n            <label>Method</label>\n            <md-select name="httpMethod" ng-model="$data.Method" required>\n              <md-option value="get">GET</md-option>\n              <md-option value="post">POST</md-option>\n              <md-option value="put">PUT</md-option>\n              <md-option value="patch">PATCH</md-option>\n              <md-option value="delete">DELETE</md-option>\n            </md-select>\n            <div class="errors" ng-messages="createOperationForm.httpMethod.$error">\n              <div ng-message="required">Required</div>\n            </div>\n          </md-input-container>\n\n          <md-input-container>\n            <label>Name (Operation ID)</label>\n            <input name="name" ng-model="$data.Name" md-maxlength="50">\n          </md-input-container>\n        </div>\n      </div>\n    </md-dialog-content>\n\n    <md-dialog-actions layout="row">\n      <span flex></span>\n      <md-button ng-click="cancel()">\n        Cancel\n      </md-button>\n      <md-button class="md-primary" ng-click="answer(\'useful\')">\n        Create API Operation\n      </md-button>\n    </md-dialog-actions>\n  </form>\n</md-dialog>\n');
  $templateCache.put('modules/appEditor/html/dialog/viewApiSchema.html', '<md-dialog id="Dialog_ViewApiSchema"\n  aria-label="Create Operation Form">\n  <form name="createOperationForm" ng-cloak>\n    <md-toolbar>\n      <div class="md-toolbar-tools">\n        <h2>View API Schema</h2>\n        <span flex></span>\n        <md-button class="md-icon-button" ng-click="cancel()">\n          <md-icon class="material-icons" aria-label="Close dialog">\n            close\n          </md-icon>\n        </md-button>\n      </div>\n    </md-toolbar>\n\n    <md-dialog-content>\n      <div class="schema-source">\n        <pre ng-bind="schema"></pre>\n      </div>\n    </md-dialog-content>\n\n    <md-dialog-actions layout="row">\n      <span flex></span>\n      <md-button class="md-primary" ng-click="cancel()">\n        Close\n      </md-button>\n    </md-dialog-actions>\n  </form>\n</md-dialog>\n');
}]);
//# sourceMappingURL=app.js.map
