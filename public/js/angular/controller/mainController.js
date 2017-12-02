angular.module('mainController', [])

    .controller('facebookController', ['$scope','$http','Facebook', 'Email', function($scope, $http, Facebook, Email) {

        $scope.facebook_user_data = {};
        $scope.loading = true;
        $scope.emailFormData = {};
        $scope.email_success_message = '';
        $scope.userDetails = {};

        var token = 'EAACEdEose0cBAH5cOO5yam9PKyytz1pArB04ox60sjq5GJZAnk3kg1sqvxVpkPrK9ZCZA3VfjnJu5PQ78ZAZA2fYyYbFG4ilQqzbp6f30lPkZC5bwgbX8obouLhyV6XuAGgfy3nmWtT8I06MSZC3WSE0myXlmQXnAyxsMJ4ytWqkGRy4UU4B4i6c3mJTk8mVHKkKl028ZB9Y4wZDZD';

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