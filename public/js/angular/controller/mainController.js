var result = '';
angular.module('mainController', [])

    .controller('facebookController', ['$scope','$http','Facebook', function($scope, $http, Facebook) {

        $scope.facebook_user_data = {};
        $scope.loading = true;

        var token = 'EAACEdEose0cBACzvPnqYHXmWUPCOlW6dSYHUk0sb69JZAdE5uZAFg3dsUZAZCsNBH5HCPYP8X4A5tZAviqEICgV3ZCzyi5PqHoErh1WwtCTIKKRG0LOnH3H9AfIu8NMolNk0x1M22X1JgxA3ZAJBIhYOkO2troZBeSrtZCkqHKvrOk8JuyGAPxVDZBSq17dqAmZCFGTZCGVNZCZCC6cAZDZD';

        Facebook.getUserData(token).success(function(data) {
            console.log(data);
            $scope.facebook_user_data = data;
            $scope.loading = false;
            console.log(document);
            //result = document.documentElement.outerHTML;
            result= document;
            console.log(result)

        })

        $scope.exportCtrl = function(){

            console.log($(result.documentElement).prop(outerHTML));
            var data = {"html": result.documentElement.outerHTML}
            Facebook.postWebsiteData(data);
        }
    }]);