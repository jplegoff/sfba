

angular.module('apiClient', [ 'restlet.sfbaapi' ])

.config(function (myApiProvider) {
  // Sets the basic authentication
  myApiProvider.setBasicAuth('yourUsername', 'yourPassword');
})

.controller('MainCtrl', function ($scope, $log, myApi) {
  //Get company List without config
  myApi.getItemList()
    .then(function (response) {
      $log.info('Get item list - Response status:' + response.status);
    })
    .catch(function (response) {
      $log.error('Get item list - Request failed with status:' + response.status);
    });



  // Gets a company by ID
  var id = '00b00381-4810-11e5-b106-c598859c3466';

  myApi.getItem(id)
    .then(function (response) {
      $log.info('Get an item by Id: ' + id + ' - Response status:' + response.status);
    })
    .catch(function (response) {
      $log.error('Get an item by Id: ' + id + ' - Request failed with status:' + response.status);
    });
