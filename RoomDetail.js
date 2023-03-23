app.controller(
    'RoomDetail',
    function ($scope, $http, $rootScope) {
        console.log($rootScope.sessionUser);
        var counter = 1;
        var url = $rootScope.url;
        $scope.showList = true;
        $http.get('http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=ruang').then(
            function (response) {
                $scope.data = response.data;
                console.log($scope.data);
                console.log($scope.kod_ruang);
            }, function (response) {
                alert("AJAX connection error!");
            }
        );

        $http.get('http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=ruang').then(
            function (response) {
                $scope.nama_ruang = response.data;
                console.log($scope.nama_ruang);
            }
        
    );
    
        $scope.getRowTData = function(event, item) {
            $scope.kod_ruang = item.kod_ruang;
            console.log($scope.kod_ruang);
            $scope.timetable($http);
        
          }

        $scope.timetable = function($http) {

            var urlJadual_ruang = 'http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=jadual_ruang&sesi=2022/2023&semester=1&kod_ruang=' + $scope.kod_ruang;
            
            $http.get(urlJadual_ruang).then(
                function(response) {
                $scope.detail = response.data;
                console.log($scope.detail);
            
            
        
        },
                function (response) {
                    // 2nd function to handle connection error
                    alert("AJAX connection error!");
                }
            )
        }

        $scope.getDayName = function(dayNumber) {
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return days[dayNumber-1];
        };

        $scope.getTime = function(Time) {
            var time = ["-", "07:00 AM - 08:00 AM", "08:00 AM - 09:00 AM", 
            "09:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM",
            "12:00 PM - 01:00 PM", "01:00 PM - 02:00 PM", "02:00 PM - 03:00 PM", 
            "03:00 PM - 04:00 PM", "04:00 PM - 05:00 PM", "05:00 PM - 06:00 PM",];
            return time[Time-1];
        };



          
        
    }
);