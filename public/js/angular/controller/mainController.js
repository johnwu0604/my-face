angular.module('mainController', [])

    .controller('facebookController', ['$scope','$http','Facebook', 'Email', function($scope, $http, Facebook, Email) {

        $scope.facebook_user_data = {};
        $scope.loading = true;
        $scope.emailFormData = {};
        $scope.email_success_message = '';

        var token = 'EAACEdEose0cBAM5vfR6T6RGG3UKZBlDxAZARAktwZCcA9VAcjWZAJsJjwVj6KnM5ZBHOl3xEgBz0MraV3owXdO1EYyuNPkRewSaKUFbIVrkTnQ31bJf4i8IMZBSawZCTUhcxqEQ6BqPUU9NGWKvZAB0rt05r45S9iO5me33rNnFF1sYe4nqdJIIBVUJKdPxmolBz62Ba3xc8ZBQZDZD';

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