## sfba api - version: 1.3.0
====================



#### Structure

* `module.js` is the generated SDK
* `README.md` the current file

#### Usage

* Unzip the downloaded SDK into your project dependencies folder e.g.: myProject/libs/

* The SDK can be used directly. Considering your API in module.js with the following endpoints:
  * GET /companies/{companyId}
  * POST /companies

* Create a file `app.js` and inject the SDK as a dependency for your client module:

```
angular.module('apiClient', [ 'restlet.myApi' ])

.config(function (myApiProvider) {
  // Sets the basic authentication
  myApiProvider.setBasicAuth('yourUsername', 'yourPassword');
})

.controller('MainCtrl', function ($scope, $log, myApi) {
  //Get company List without config
  myApi.getCompanyList()
    .then(function (response) {
      $log.info('Get company list - Response status:' + response.status);
    })
    .catch(function (response) {
      $log.error('Get company list - Request failed with status:' + response.status);
    });

  // Adds a company
  var body = {
    "tags": [ "test tag" ],
    "id": "test id",
    "address": {
      "zipcode": "test zipcode",
      "street": "test street",
      "city": "test city"
    },
    "name": "test name"
  };

  myApi.postCompanyList(body)
    .then(function (response) {
      $log.info('Add a company - Response status: ' + response.status);
    })
    .catch(function (response) {
      $log.error('Add a company - Request failed with status:' + response.status);
    });

  // Gets a company by ID
  var id = '00b00381-4810-11e5-b106-c598859c3466';

  myApi.getCompany(id)
    .then(function (response) {
      $log.info('Get a company by Id: ' + id + ' - Response status:' + response.status);
    })
    .catch(function (response) {
      $log.error('Get a company by Id: ' + id + ' - Request failed with status:' + response.status);
    });
```
