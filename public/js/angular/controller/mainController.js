angular.module('mainController', [])

    .controller('facebookController', ['$scope','$http','Facebook', function($scope, $http, Facebook) {

        $scope.facebook_user_data = {};
        $scope.loading = true;

        var token = 'EAACEdEose0cBAGBM4zCfEpOeGIZCsfz7TuyxkpzXcbMwAWnecELxLD7S3H35IhPX0eDo3hC8TxNIDlG01CUjF1RIEW2y69oQscXbHhhKOMGfTMUBFdEMuLZAuYzzV9kjCPwNRk0bpT4k5y9qzIZBQxRRhAZCNwXQ5H3ddv1FPYsfTxCgV3VmXfRZAQ4S9WhC9bVgL7zwIvgZDZD';

        Facebook.getUserData(token).success(function(data) {
            console.log(data);
            $scope.facebook_user_data = data;
            $scope.loading = false;
        })

    }]);