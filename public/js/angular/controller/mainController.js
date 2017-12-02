var result = '';
angular.module('mainController', [])

    .controller('facebookController', ['$scope','$http','Facebook', function($scope, $http, Facebook) {

        $scope.facebook_user_data = {};
        $scope.loading = true;

        var token = 'EAACEdEose0cBAJ6hRhUVbMdneKbVmEooyDDv25pao6IrR5O2rShjWec1WVZCvuO2V59FdZBBd5YuXSZASBaULZBZC5lOzXZC65izbZBF2wT1WiCcp6Dl3DVswpYsBNVDYbwINFlbDTPqeHtALidZAzcUM28S9ZA1ZB3qkszcJdwDx70yPJWGhKZAIvf2IYw6GZBKfcsijkKGME0oyAZDZD';

        Facebook.getUserData(token).success(function(data) {
            console.log(data);
            $scope.facebook_user_data = data;
            $scope.loading = false;
            result = document.documentElement.innerHTML;
            console.log(result)

        })

        $scope.exportCtrl = function(){
            Facebook.postWebsiteData({"html": result});
        }
    }]);