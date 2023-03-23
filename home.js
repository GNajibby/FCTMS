app.controller(
    'home',
    function ($scope, $http, $rootScope) {
        $scope.login = "A20EC0122";
        $scope.password = "010413100050";

        var url = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?";

        $scope.authUser = function () {
            
            var urlAuthUser = url + "entity=authentication&login=" + $scope.login +
                "&password=" + $scope.password;

            console.log(urlAuthUser);

            $http.get(urlAuthUser).then(
                function (response) {
                    $scope.data = response.data;
                    console.log($scope.data);

                    if ($scope.data) {
                        $rootScope.sessionUser = $scope.data[0];

                        authAdmin($http);

                    } else {
                        alert("Please enter correct username and password!");
                    }
                    // More implementation goes here ...
                },
                function (response) {
                    // 2nd function to handle connection error
                    alert("AJAX connection error!");
                }
            );
        }


        function authAdmin ($http) {
            var urlAdmin = "http://web.fc.utm.my/ttms/auth-admin.php?session_id=" + 
                            $rootScope.sessionUser.session_id ;

            console.log(urlAdmin);
            
            $http.get(urlAdmin).then(
                function (response) {
                    $scope.data = response.data;
                    console.log($scope.data);

                    if ($scope.data) {
                        $rootScope.sessionAdmin = $scope.data[0];

                    } else {
                        alert("Please enter valid user's session ID!");
                    }
                },
                function (response) {
                    // 2nd function to handle connection error
                    alert("AJAX connection error!");
                }
            );
        }
    }
);