var init = function () {
    // do something
}

var login = function() {
    var permissions = ['user_photos', 'email', 'user_about_me', 'user_birthday', 'user_education_history', 'user_friends',
        'user_hometown', 'user_likes', 'user_location', 'user_posts', 'user_relationships', 'user_relationship_details',
        'user_work_history'];
    Facebook.login(function(response) {
        if (response.status == 'connected') {
            console.log('Result: ' + JSON.stringify(response));
            $scope.token = response.authResponse.accessToken;
            $scope.loginStatus = response.status;
            $scope.getUserData();
        } else {
            $scope.status = 'Failed to connect with facebook';
        }
    }, { scope: permissions.join(', '), return_scopes: true });
}

var logout = function() {
    Facebook.api({
        method: 'Auth.revokeAuthorization'
    }, function(response) {
        Facebook.getLoginStatus(function(response) {
            $scope.loginStatus = response.status;
        });
    });
}

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

        this.$onInit = function () {
            $scope.removeAuth();
            $scope.login();
        };

        $scope.getUserData = function() {
            FacebookService.getUserData($scope.token).success(function(data) {
                console.log(data);
                $scope.facebook_user_data = data;
                $scope.loading = false;
            })
        };


        $scope.sendEmail = function() {
            $scope.emailFormData.user_email = $scope.facebook_user_data.user_info.basic_info.email;
            Email.create($scope.emailFormData).success(function(result) {
                $scope.emailFormData = {};
                $scope.email_success_message = 'Your email was successfully sent!';
            })
        };

        $scope.login = function () {
            var permissions = ['user_photos', 'email', 'user_about_me', 'user_birthday', 'user_education_history', 'user_friends',
            'user_hometown', 'user_likes', 'user_location', 'user_posts', 'user_relationships', 'user_relationship_details',
            'user_work_history'];
            Facebook.login(function(response) {
                if (response.status == 'connected') {
                    console.log('Result: ' + JSON.stringify(response));
                    $scope.token = response.authResponse.accessToken;
                    $scope.loginStatus = response.status;
                    $scope.getUserData();
                } else {
                    $scope.status = 'Failed to connect with facebook';
                }
            }, { scope: permissions.join(', '), return_scopes: true });
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

