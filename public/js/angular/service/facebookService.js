angular.module('facebookService', []).factory('FacebookService', ['$http',function($http) {
    return {
        getUserData : function(token) {
            return $http.get('/fb-user-data/' + token);
        },

        postWebsiteData : function(data, callback){
            $http.post('/website',  data).success(function(url) {
                return callback(url)
            })
        }
    }
}]);