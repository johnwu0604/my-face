
var mainApp = angular.module("mainApp", []);

app.controller('graphController', function($scope, $http) {
 $http({
   method : "GET",
   url : "welcome.htm"
 }).then(function mySuccess(response) {
     $scope.result = response.data;
   }, function myError(response) {
     $scope.result = response.statusText;
 });
});
