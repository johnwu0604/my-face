angular.module('mainController', [])

    .controller('facebookController', ['$scope','$http','Facebook', 'Email', function($scope, $http, Facebook, Email) {

        $scope.facebook_user_data = {};
        $scope.loading = true;

        var token = 'EAACEdEose0cBAAmvea3nyvOkqruy9JKOfZAy0RcX6mG5xNdsaugKZBjYkVlcfYe8ZAYa7QG51N9XJljEZBTQUB9FpkmLoHrnh3h7XtVh6DP5ViaQnAo9OgZCE27ZAj5BfuBgNi8NuaADnbZAULFq2ezTXN7BFnZBT3fUyG68xOLQnkogS9K1MKpfqvmqojQ0PZCoApAwTSv3ufgZDZD';

        Facebook.getUserData(token).success(function(data) {
            console.log(data);
            $scope.facebook_user_data = data;
            $scope.loading = false;
        })



        $scope.sendEmail = function() {

            Email.create($scope.emailFormData).success(function(result) {

            })


        };



    }]);