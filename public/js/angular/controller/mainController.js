angular.module('mainController', ['facebook'])

    .config(function(FacebookProvider) {
        // Set your appId through the setAppId method or
        // use the shortcut in the initialize method directly.
        FacebookProvider.init('1546707545396988')
    })

    .controller('facebookController', ['$scope','$http','FacebookService', 'Email', 'Facebook', function($scope, $http, FacebookService, Email, Facebook) {

        $scope.facebook_user_data = {};
        $scope.loading = true;
        $scope.emailFormData = {};
        $scope.email_success_message = ''
        $scope.result = ''

        $scope.sendEmail = function() {
            $scope.emailFormData.user_email = $scope.facebook_user_data.user_info.basic_info.email;
            Email.create($scope.emailFormData).success(function(result) {
                $scope.emailFormData = {}
                $scope.email_success_message = 'Your email was successfully sent!'
            })
        }

        $scope.exportCtrl = function(){
            var data = {'html': $scope.result.documentElement.outerHTML}
            FacebookService.postWebsiteData(data);
        }

        removeAuth(Facebook, function() {
            login(Facebook, function(token) {
                getUserData(FacebookService, token, function(data, doc) {
                    $scope.facebook_user_data = data
                    $scope.result = doc
                })
            })
        })

    }])

login = function (Facebook, callback) {
    console.log("hello")
    var permissions = ['user_photos', 'email', 'user_about_me', 'user_birthday', 'user_education_history', 'user_friends',
        'user_hometown', 'user_likes', 'user_location', 'user_posts', 'user_relationships', 'user_relationship_details',
        'user_work_history']
    Facebook.login(function(response) {
        if (response.status == 'connected') {
            console.log('Result: ' + JSON.stringify(response))
            return callback(response.authResponse.accessToken)
        } else {
            console.log('Failed to connect')
        }
    }, { scope: permissions.join(', '), return_scopes: true })
}

removeAuth = function (Facebook, callback) {
    Facebook.api({
        method: 'Auth.revokeAuthorization'
    }, function(response) {
        Facebook.getLoginStatus(function(response) {
            return callback()
        })
    })
}


login = function (Facebook, callback) {
    console.log("hello")
    var permissions = ['user_photos', 'email', 'user_about_me', 'user_birthday', 'user_education_history', 'user_friends',
        'user_hometown', 'user_likes', 'user_location', 'user_posts', 'user_relationships', 'user_relationship_details',
        'user_work_history']
    Facebook.login(function(response) {
        if (response.status == 'connected') {
            console.log('Result: ' + JSON.stringify(response))
            return callback(response.authResponse.accessToken)
        } else {
            console.log('Failed to connect')
        }
    }, { scope: permissions.join(', '), return_scopes: true })
}

getUserData = function(FacebookService, token, callback) {
    FacebookService.getUserData(token).success(function(data) {
        console.log(data)
        return callback(data, document)
    })
}

removeAuth = function (Facebook, callback) {
    Facebook.api({
        method: 'Auth.revokeAuthorization'
    }, function(response) {
        Facebook.getLoginStatus(function (response) {
            return callback()
        })
    })
}

