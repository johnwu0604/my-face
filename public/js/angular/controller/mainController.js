angular.module('mainController', [])

    .controller('facebookController', ['$scope','$http','Facebook', function($scope, $http, Facebook) {

        $scope.facebook_user_data = {};
        $scope.loading = true;

        var token = 'EAACEdEose0cBADpHzBY7UKsQeGbTGJwl4lekVJdZBkZBrFYFSbLhSHpZBSVcm5mtIoUUorZBBBiZAq3ZBODuuUIpyy6CwUpSgU2SrcHJDqzX4hjMovwpViCUzbvZB937W1xYZBuH1ZA90cTeHDLG8VgeINZCuzlFeAcGjsTRPi36loloNsJyDBpgYcJBai2v2yScj2Qkxkeru8ZC2QleeMSYYZCgvLrZB1G8uAKIZD';

        Facebook.getUserData(token).success(function(data) {
            console.log(data);
            $scope.facebook_user_data = data;
            $scope.loading = false;
        })

    }]);