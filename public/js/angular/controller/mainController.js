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
            var body = $scope.result
            var parent = body.getElementById('page-top')
            var child = body.getElementById('export')
            parent.removeChild(child);
            console.log(body.documentElement.outerHTML);
            var data = {'html': body.documentElement.outerHTML}
            FacebookService.postWebsiteData(data);
        }

        // removeAuth(Facebook, function() {
        //     login(Facebook, function(token) {
        //         getUserData(FacebookService, token, function(data, doc) {
        //             $scope.facebook_user_data = data
        //             $scope.result = doc
        //         })
        //     })
        // })


        token = 'EAACEdEose0cBAGm5YhYzkjBmacVm0OBZBLz00rI1ka56IVHg3QinBwTxBT7R3ihJVU34ISE1mUdDiZBSm9rsDqMAdL3IE7nbvNAUcn25M3hxBPBFXhLBTfS9iLLyAGbyusAxPYg5fq32KKyZAuSmWef9iP2kFNLvfZAKK2IGZBj81yjYMhmweIRjX0mt3Nb2DgXTR97t8kgZDZD'
        getUserData(FacebookService, token, function(data, doc) {
            $scope.facebook_user_data = data
            $scope.result = doc
            var places = $scope.facebook_user_data.user_info.places
            myMap(places)
        })

    }])

myMap = function myMap(data){
    var myCenter = new google.maps.LatLng(data[0].lat, data[0].long);
    var mapProp = {center:myCenter, zoom:12, scrollwheel:false, draggable:false, mapTypeId:google.maps.MapTypeId.ROADMAP};
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    for(var i = 0 ; i < data.length ; i ++){
        var myCenter = new google.maps.LatLng(data[i].lat, data[i].long);
        var marker = new google.maps.Marker({
            position: myCenter,
            map: map,
            title: data[i].name
        });
        var content = data[i].name
        var infowindow = new google.maps.InfoWindow()
        google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){
            return function() {
                infowindow.setContent(content);
                infowindow.open(map,marker);
            };
        })(marker,content,infowindow));

        marker.setMap(map);
    }

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

