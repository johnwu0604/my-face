angular.module('mainController', [])

    .controller('facebookController', ['$scope','$http','Facebook', 'Email', function($scope, $http, Facebook, Email) {

        $scope.facebook_user_data = {};
        $scope.loading = true;
        $scope.emailFormData = {};
        $scope.email_success_message = '';
        $scope.userDetails = {};

        var token = '"EAAVZBuOnQlvwBAJRbzA3NCKrtunKvctHSEfv7iC6rOnNAPcWZBLE3u3kODn5wayit2AhBsZCwYLY5Db0duKqJK0puVRns0lmpSw3XeT3hTDzftTIeM51lwMaBncd9agRpNjt6Q2GHb0uAUDZCxZB3sZCdaCBxQZBD1h7ITxNXb6ZA8ejpBzNZCOl8YxGB0c1J6iyyQ5FPBHwULwZDZD"';

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