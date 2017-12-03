

angular.module('facebookService', []).factory('FacebookService', ['$http',function($http) {
    return {
        getUserData : function(token) {
            var user_data = $http.get('/fb-user-data/' + token)
            return user_data;
        },

        postWebsiteData : function(data, callback){
            $http.post('/website',  data).success(function(url) {
                return callback(url)
            })
        }
    }
}]);