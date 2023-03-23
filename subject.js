
app.controller(
    'sessem',
    function ($scope, $http, $rootScope) {
        console.log($rootScope.sessionUser);
        var counter = 1;
        $scope.showList = true;

      $http.get('http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=sesisemester').then(
            function (response) {
                $scope.data = response.data;
                $scope.sem=response.data[0];
                $scope.semester=response.data[0].sesi+"-"+response.data[0].semester;
                console.log($scope.data);
                console.log($scope.semester);
                // More implementation goes here ...
            }, function (response) {
                // 2nd function to handle connection error
                alert("AJAX connection error!");
            }
        );

       
            $http.get('http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=subjek&sesi=2022/2023&semester=1').then(
                function (response) {
                    $scope.subject = response.data;
                    //console.log($scope.subject);
                    // More implementation goes here ...
                },
            function (response) {
                // 2nd function to handle connection error
                alert("AJAX connection error!");
            }
        );
       
        //Get Row Data
        $scope.getRowTData = function(event, item) {
            $scope.kod_subjek = item.kod_subjek;
            console.log($scope.kod_subjek);
            $scope.class($http);
            $scope.c($http);


          }

        $scope.class = function($http) {
            var urlTotalStud_subjek = 'http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=subjek_seksyen&sesi=2022/2023&semester=1';
            //console.log(urlTotalStud_subjek);

            $http.get(urlTotalStud_subjek).then(
                function(response) {
                $scope.section = response.data;
                //console.log($scope.kod_subjek);
                //console.log($scope.section[30].seksyen_list[0].pensyarah);

                
                    
                 },
                function (response) {
                    // 2nd function to handle connection error
                    alert("AJAX connection error!");
                }
            )
        }
        $scope.c = function($http) {
         var urlJadual_subjek = 'http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=jadual_subjek&sesi=2022/2023&semester=1&kod_subjek=' + $scope.kod_subjek;
            //console.log(urlTotalStud_subjek);

            $http.get(urlJadual_subjek).then(
                function(response) {
                $scope.time = response.data;
                for (let i = 0; i < $scope.time.length; i++) {
                    switch($scope.time[i].hari){
                        case 1: $scope.time[i].hari = "Ahad";
                            break;
                        case 2: $scope.time[i].hari = "Isnin";
                            break;
                        case 3: $scope.time[i].hari = "Selasa";
                            break;
                        case 4: $scope.time[i].hari = "Rabu";
                            break;
                        case 5: $scope.time[i].hari = "Khamis";
                            break;
                        case 6: $scope.time[i].hari = "Jumaat";
                            break;
                        case 7: $scope.time[i].hari = "Sabtu";
                            break; 
                    }
                    switch($scope.time[i].masa){
                        case 2: $scope.time[i].masa= "8:00 am";
                            break;
                        case 3: $scope.time[i].masa = "9:00 am";
                            break;
                        case 4: $scope.time[i].masa = "10:00 am";
                            break;
                        case 5: $scope.time[i].masa = "11:00 am";
                            break;
                        case 6: $scope.time[i].masa = "12:00 pm";
                            break;
                        case 8: $scope.time[i].masa = "2:00 pm";
                            break;
                        case 9: $scope.time[i].masa = "3:00 pm";
                            break; 
                        case 10: $scope.time[i].masa = "4:00 pm";
                            break; 
                        case 11: $scope.time[i].masa = "5:00 pm";
                        break; 
                    }
                }
                
                
            /*  let uniqueJadualBySeksyen = {};

            for (let i = 0; i < $scope.time.length; i++) {
                let seksyen = $scope.time[i].seksyen;
                let hari = $scope.time[i].hari;
                let ruang = $scope.time[i].ruang.nama_ruang_singkatan;

                if (!(seksyen in uniqueJadualBySeksyen)) {
                    uniqueJadualBySeksyen[seksyen] = {};
                }
                if (!(hari in uniqueJadualBySeksyen[seksyen])) {
                    uniqueJadualBySeksyen[seksyen][hari] = {};
                }
                if (!(ruang in uniqueJadualBySeksyen[seksyen][hari])) {
                    uniqueJadualBySeksyen[seksyen][hari][ruang] = [];
                }
                uniqueJadualBySeksyen[seksyen][hari][ruang].push($scope.time[i]);
            }

                $scope.uniqueJadualBySeksyen = uniqueJadualBySeksyen;
                //$rootScope.day= arrange1;
                
                // Now you can access the merged jadual for a given hari and seksyen using the key
                //console.log($scope.uniqueJadualBySeksyen);*/
               
                    
                },
                function (response) {
                    // 2nd function to handle connection error
                    alert("AJAX connection error!");
                }
            )
        }
        
       
    }
);