angular.module('emailService', []).factory('Email', ['$http',function($http) {
    return {
        create : function(emailFormData) {
            return $http.post('/email', emailFormData);
        }
    }
}]);