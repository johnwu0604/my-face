angular.module('mainController', [])

    .controller('facebookController', ['$scope','$http','Facebook', function($scope, $http, Facebook) {

        $scope.facebook_user_data = {};
        $scope.loading = true;

        var token = 'EAACEdEose0cBAB4ru0vYtqugQgVZAjglF8OUgI0NuYbUcXGKNpuPvWBamvZCsxhF8M7abDrfezgcw7IKLiTHlnexpkQM9Wg0hcB0GM8a23DYZAlL85zRuaZBUkA5ALIEsmWycmi0baZBMq73cGCgErT3yxKVgfqJX6TxZBioHb5hQqnCIXYK1NKvZB3Yd1aQ4IZD';

        Facebook.getUserData(token).success(function(data) {
            console.log(data);
            $scope.facebook_user_data = data;
            $scope.loading = false;
        })

    }]);