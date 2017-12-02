angular.module('mainController', [])

    .controller('facebookController', ['$scope','$http','Facebook', function($scope, $http, Facebook) {

        $scope.facebook_user_data = {};
        $scope.loading = true;

        var token = 'EAACEdEose0cBAEY6QtzzjOCgnLOoC0WZBTYk21idoZBMZBhM6ZBuX2D4PoBuyisXfCumAsZBlrErpnHKSyzjD2zjKbdH9IsZCwySvq63F0HmSjLZCdX5IViX5H9ThKcdNIZCI4ktZAVZAuwYnnELUdnGx2EXpQ9ikb5oCL5RdiwZCe3PjQvqNemzF2fSCM8OOIquOwmACMro4o8CgZDZD';

        Facebook.getUserData(token).success(function(data) {
            console.log(data);
            $scope.facebook_user_data = data;
            $scope.loading = false;
        })

    }]);