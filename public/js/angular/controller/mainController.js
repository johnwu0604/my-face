angular.module('mainController', ['facebook'])

    .config(function(FacebookProvider) {
        // Set your appId through the setAppId method or
        // use the shortcut in the initialize method directly.
        FacebookProvider.init('1546707545396988');
    })

    .controller('facebookController', ['$scope','$http','FacebookService', 'Email', 'Facebook', function($scope, $http, FacebookService, Email, Facebook) {

        $scope.facebook_user_data = {};
        $scope.loading = true;
        $scope.emailFormData = {};
        $scope.email_success_message = '';

        $scope.loginStatus = 'disconnected';
        $scope.facebookIsReady = false;
        $scope.user = null;

        $scope.token = '';


        $scope.getUserData = function() {
            FacebookService.getUserData($scope.token).success(function(data) {
                console.log(data);
                $scope.facebook_user_data = data;
                $scope.loading = false;
            })
        }



        $scope.sendEmail = function() {
            $scope.emailFormData.user_email = $scope.facebook_user_data.user_info.basic_info.email;
            Email.create($scope.emailFormData).success(function(result) {
                $scope.emailFormData = {};
                $scope.email_success_message = 'Your email was successfully sent!';
            })
        };

        $scope.login = function () {
            Facebook.login(function(response) {
                console.log('Result: ' + JSON.stringify(response));
                $scope.token = response.authResponse.accessToken;
                $scope.loginStatus = response.status;
                $scope.getUserData();
            });
        };

        $scope.removeAuth = function () {
            Facebook.api({
                method: 'Auth.revokeAuthorization'
            }, function(response) {
                Facebook.getLoginStatus(function(response) {
                    $scope.loginStatus = response.status;
                });
            });
        };




    }]);

