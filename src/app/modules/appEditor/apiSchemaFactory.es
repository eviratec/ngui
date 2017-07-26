
  angular.module('DataStudioWebui.AppEditor')
    .factory('ApiSchema', ApiSchemaFactory);

  ApiSchemaFactory.$inject = [];
  function ApiSchemaFactory () {

    class ApiSchema {
      constructor (operations, routes) {
        this.operations = operations;
        this.routes = routes;
      }
      toJSON () {
        let operations = this.operations;
        let routes = this.routes;
        let paths = {};
        let routePaths = {};

        routes.forEach(route => {
          let path = route.Path;
          paths[path] = {};
          routePaths[route.Id] = path;
        });

        operations.forEach(operation => {

          let op;
          let method;

          let targetPath = routePaths[operation.RouteId];

          let pathExists = targetPath in paths;
          if (!pathExists) {
            return;
          }

          method = operation.Method;
          op = {
            operationId: operation.Name,
            summary: '',
            description: '',
            tags: [],
            consumes: [
              'application/json',
            ],
            produces: [
              'application/json',
            ],
            params: [],
            responses: {},
          };

          decorate(op, method, targetPath);

          paths[targetPath][method] = op;

        });

        return {
          swagger: '2.0',
          info: {
            title: '',
            description: '',
            version: '0.0.0-ALPHA',
            contact: {
              email: '',
            },
            license: {
              name: '',
              url: '',
            },
          },
          host: 'api.localhost',
          basePath: '/',
          tags: [],
          schemes: [
            'http',
            'https',
          ],
          paths: paths,
          definitions: {},
        };

      }
    };

    return ApiSchema;

    function decorate (op, method, uri) {

      let uriParts = uri.split(/\//g).slice(1);
      let className = '';

      uriParts.forEach(uriPart => {
        let isVariable = ':' === uriPart[0];
        if (!isVariable) {
          let c = uriPart[0].toUpperCase();
          className = c + uriPart.substr(1);
          className = className.replace(/ies$/, 'y');
          className = className.replace(/s$/, '');
          op.tags.push(className);
          return;
        }
        op.params.push({
          in: 'path',
          name: uriPart.substr(1),
          description: '',
          required: true,
          type: 'string',
        });
      });

      if ('post' === method) {
        add303Response(op);
        add400Response(op);
        add401Response(op);
        add403Response(op);
        op.params.push({
          in: 'body',
          name: 'body',
          description: `The new \`${className}\``,
          required: true,
          schema: {
            $ref: `#/definitions/New${className}`,
          },
        });
      }

      if ('get' === method) {
        add200Response(op);
        add404Response(op);
      }

      if ('put' === method) {
        add200Response(op);
        add202Response(op);
        add400Response(op);
        add401Response(op);
        add403Response(op);
        op.params.push({
          in: 'body',
          name: 'body',
          description: `The \`${className}\` data to save`,
          required: true,
          schema: {
            $ref: `#/definitions/${className}`,
          },
        });
      }

      if ('delete' === method) {
        add204Response(op);
        add401Response(op);
        add403Response(op);
        add404Response(op);
      }

      function add200Response (op) {
        op.responses['200'] = {
          description: 'OK',
          schema: {
            $ref: `#/definitions/${className}`,
          },
        };
      }

      function add202Response (op) {
        op.responses['202'] = {
          description: 'Accepted',
        };
      }

      function add204Response (op) {
        op.responses['204'] = {
          description: 'No Content',
        };
      }

      function add303Response (op) {
        op.responses['303'] = {
          description: 'See Other',
        };
      }

      function add400Response (op) {
        op.responses['400'] = {
          description: 'Bad Request',
        };
      }

      function add401Response (op) {
        op.responses['401'] = {
          description: 'Unauthorized',
        };
      }

      function add403Response (op) {
        op.responses['403'] = {
          description: 'Forbidden',
        };
      }

      function add404Response (op) {
        op.responses['404'] = {
          description: 'Not Found',
        };
      }

    }

  }
