app.controller(
    'pensyarah', 
    function ($scope, $http, $rootScope) {
        let session_id = $rootScope.sessionAdmin.session_id;
        var counter = 1;
    
        $http.get('http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=pensyarah&session_id='+session_id+'&sesi=2022/2023&semester=1').then(
            function (response) {
                $scope.data = response.data;
                console.log($scope.data);
                // More implementation goes here ...

            },
            function (response) {
                // 2nd function to handle connection error
                alert("AJAX connection error!");
            }
        );

        //Get Row Data
        $scope.getRowData = function(event, item) {
                //console.log("Attempt Access");
                $scope.nama = item.nama;
                $scope.no_pekerja = item.no_pekerja;
                $scope.pensyarah_subjek($http);
        }


        //Details
        $scope.pensyarah_subjek = function($http) {
            var urlPensyarah_subjek = 'http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=pensyarah_subjek&no_pekerja=' + $scope.no_pekerja;
            console.log(urlPensyarah_subjek);

            $http.get(urlPensyarah_subjek).then(
                function(response) {
                    $scope.subjek = response.data;
                },
                function (response) {
                    // 2nd function to handle connection error
                    alert("AJAX connection error!");
                }
            )
        }
    }
);