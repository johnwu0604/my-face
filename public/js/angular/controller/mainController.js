angular.module('mainController', [])

    .controller('facebookController', ['$scope','$http','Facebook', 'Email', function($scope, $http, Facebook, Email) {

        $scope.facebook_user_data = {};
        $scope.loading = true;
        $scope.emailFormData = {};
        $scope.email_success_message = '';

        var token = 'EAACEdEose0cBAAmvea3nyvOkqruy9JKOfZAy0RcX6mG5xNdsaugKZBjYkVlcfYe8ZAYa7QG51N9XJljEZBTQUB9FpkmLoHrnh3h7XtVh6DP5ViaQnAo9OgZCE27ZAj5BfuBgNi8NuaADnbZAULFq2ezTXN7BFnZBT3fUyG68xOLQnkogS9K1MKpfqvmqojQ0PZCoApAwTSv3ufgZDZD';

        Facebook.getUserData(token).success(function(data) {
            console.log(data);
            $scope.facebook_user_data = data;
            $scope.loading = false;
        })



        $scope.sendEmail = function() {
            $scope.emailFormData.user_email = $scope.facebook_user_data.user_info.basic_info.email;
            Email.create($scope.emailFormData).success(function(result) {
                $scope.emailFormData = {};
                $scope.email_success_message = 'Your email was successfully sent!';
            })
        };



    }]);