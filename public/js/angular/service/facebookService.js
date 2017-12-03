angular.module('facebookService', []).factory('FacebookService', ['$http',function($http) {
    return {
        getUserData : function(token) {
            return $http.get('/fb-user-data/' + token);
        },

        postWebsiteData : function(data){
            return $http.post('/website',  data);
        }
    }
}]);