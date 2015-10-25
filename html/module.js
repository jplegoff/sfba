angular.module('restlet.sfbaapi', [])

  .provider('sfbaapi', function () {
    'use strict';

    var endpoint = 'https://sfba.apispark.net/v1';
    var defaultHeaders = {};
    var defaultQueryParameters = {};

    /**
     * Sets a new endpoint.
     *
     * @param newEndPoint - the endpoint to be set.
     */
    this.setEndpoint = function (newEndPoint) {
      endpoint = newEndPoint;
    };

    /**
     * Sets up the authentication to be performed through basic auth.
     *
     * @param username - the user's username
     * @param password - the user's password
     */
    this.setBasicAuth = function (username, password) {
      var digested = 'Basic ' + btoa(username + ':' + password);

      defaultHeaders.Authorization = digested;
    };

    /**
     * Sets up the authentication to be performed through API token.
     *
     * @param tokenName - the name of the query parameter or header based on the location parameter.
     * @param tokenValue - the value of the token.
     * @param location - the location of the token, either header or query.
     */
    this.setApiToken = function (tokenName, tokenValue, location) {
      if (angular.isUndefined(location)) {
        location = 'header';
      }

      if (location === 'query') {
        defaultQueryParameters[ tokenName ] = tokenValue;
      } else if (location === 'header') {
        defaultHeaders[ tokenName ] = tokenValue;
      } else {
        throw new Error('Unknown location: ' + location);
      }
    };

    this.$get = [ '$http', function ($http) {
      var sfbaapi = {};

      /**
       * Checks path variables
       */
      function checkPathVariables () {
        var errors = [];
        for (var i = 0; i < arguments.length; i += 2) {
          if (angular.isUndefined(arguments[ i ])) {
            errors.push(arguments[ i + 1 ]);
          }
        }

        if (errors.length > 0) {
          throw new Error('Missing required parameter: ' + errors.join(', '));
        }
      }

      /**
       * Sends a request to server.
       * @param methodName - The name of method: GET, POST, PUT, DELETE
       * @param url - url
       * @param body - body
       * @param config - Object describing the request to be made and how it should be processed.
       * @returns{HttpPromise} a promise object
       */
      function send (methodName, url, config, body) {
        config = config || {};

        return $http({
          method: methodName,
          url: url,
          params: angular.extend({}, defaultQueryParameters, config.params),
          data: body,
          headers: angular.extend({}, defaultHeaders, config.headers)
        });
      }

      /**
       * Loads a list of item
       *
       * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
       * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
       {
         "target" : "",
         "$page" : "Number of the page to retrieve. Integer value.",
         "comment" : "",
         "shopLink" : "",
         "pictureLink" : "",
         "id" : "",
         "price" : "",
         "dealLink" : "",
         "$size" : "Size of the page to retrieve. Integer value",
         "$sort" : "Order in which to retrieve the results. Multiple sort criteria can be passed. Example: sort=age ASC,height DESC",
         "name" : "",
         "description" : ""
       }
       * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
       *
       * @returns {HttpPromise} - a promise resolved with the response from the server.
       * In case of success (status in the 2XX range)
       *   * Status code : 200 - Payload :
       [
         {
           "comment" : "sample comment",
           "dealLink" : "sample dealLink",
           "description" : "sample description",
           "id" : "sample id",
           "name" : "sample name",
           "pictureLink" : "sample pictureLink",
           "price" : "sample price",
           "shopLink" : "sample shopLink",
           "target" : "sample target"
         }
       ]
       */
      sfbaapi.getItemList = function (config) {
        var url = endpoint + '/items/';

        return send('GET', url, config);
      };

      /**
       * Adds a item
       *
       * @param body - the item payload with the following structure:
       *
       {
         "comment" : "sample comment",
         "dealLink" : "sample dealLink",
         "description" : "sample description",
         "id" : "sample id",
         "name" : "sample name",
         "pictureLink" : "sample pictureLink",
         "price" : "sample price",
         "shopLink" : "sample shopLink",
         "target" : "sample target"
       }
       *
       * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
       * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
       * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
       *
       * @returns {HttpPromise} - a promise resolved with the response from the server.
       * In case of success (status in the 2XX range)
       *   * Status code : 200 - Payload :
         {
           "comment" : "sample comment",
           "dealLink" : "sample dealLink",
           "description" : "sample description",
           "id" : "sample id",
           "name" : "sample name",
           "pictureLink" : "sample pictureLink",
           "price" : "sample price",
           "shopLink" : "sample shopLink",
           "target" : "sample target"
         }
       */
      sfbaapi.postItemList = function (body, config) {
        var url = endpoint + '/items/';

        return send('POST', url, config, body);
      };

      /**
       * Loads a item
       *
       * @param itemid - REQUIRED - Identifier of the item
       * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
       * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
       * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
       *
       * @throws will throw an error if a required parameter is not set
       *
       * @returns {HttpPromise} - a promise resolved with the response from the server.
       * In case of success (status in the 2XX range)
       *   * Status code : 200 - Payload :
         {
           "comment" : "sample comment",
           "dealLink" : "sample dealLink",
           "description" : "sample description",
           "id" : "sample id",
           "name" : "sample name",
           "pictureLink" : "sample pictureLink",
           "price" : "sample price",
           "shopLink" : "sample shopLink",
           "target" : "sample target"
         }
       */
      sfbaapi.getItem = function (itemid, config) {
        checkPathVariables(itemid, 'itemid');

        var url = endpoint + '/items/' + itemid + '';

        return send('GET', url, config);
      };

      /**
       * Stores a item
       *
       * @param itemid - REQUIRED - Identifier of the item
       * @param body - the item payload with the following structure:
       *
       {
         "comment" : "sample comment",
         "dealLink" : "sample dealLink",
         "description" : "sample description",
         "id" : "sample id",
         "name" : "sample name",
         "pictureLink" : "sample pictureLink",
         "price" : "sample price",
         "shopLink" : "sample shopLink",
         "target" : "sample target"
       }
       *
       * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
       * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
       * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
       *
       * @throws will throw an error if a required parameter is not set
       *
       * @returns {HttpPromise} - a promise resolved with the response from the server.
       * In case of success (status in the 2XX range)
       *   * Status code : 200 - Payload :
         {
           "comment" : "sample comment",
           "dealLink" : "sample dealLink",
           "description" : "sample description",
           "id" : "sample id",
           "name" : "sample name",
           "pictureLink" : "sample pictureLink",
           "price" : "sample price",
           "shopLink" : "sample shopLink",
           "target" : "sample target"
         }
       */
      sfbaapi.putItem = function (itemid, body, config) {
        checkPathVariables(itemid, 'itemid');

        var url = endpoint + '/items/' + itemid + '';

        return send('PUT', url, config, body);
      };

      /**
       * Deletes a item
       *
       * @param itemid - REQUIRED - Identifier of the item
       * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
       * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
       * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
       *
       * @throws will throw an error if a required parameter is not set
       *
       * @returns {HttpPromise} - a promise resolved with the response from the server.
       * In case of success (status in the 2XX range)
       */
      sfbaapi.deleteItem = function (itemid, config) {
        checkPathVariables(itemid, 'itemid');

        var url = endpoint + '/items/' + itemid + '';

        return send('DELETE', url, config);
      };

      return sfbaapi;
    } ];
  });