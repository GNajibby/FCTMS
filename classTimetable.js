app.controller(
    'classTimetable',
    function ($scope, $http, $rootScope) {
        var url = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?";
        getSessemList($http);

        function getSessemList($http) {
            var urlSessemList = url + "entity=sesisemester";

            $http.get(urlSessemList).then(
                function (response) {
                    console.log(response.data);

                    if (response.data) {
                        $rootScope.sessemList = response.data;
                        $rootScope.currentSession = $rootScope.sessemList[0].sesi;
                        $rootScope.currentSemester = $rootScope.sessemList[0].semester;
                        
                        getUserCourses($http, $rootScope.currentSession, $rootScope.currentSemester);
                    }
                },
                function (response) {
                    // 2nd function to handle connection error
                    alert("AJAX connection error!");
                }
            );
        }

        function getUserCourses($http, currentSession, currentSemester) {
            var urlUserCourses = url;
        
            if ($rootScope.sessionUser.description == "Pelajar FSKSM") {
                urlUserCourses += "entity=pelajar_subjek&no_matrik=" + $rootScope.sessionUser.login_name;
        
            } else if ($rootScope.sessionUser.description == "Pensyarah")  {
                urlUserCourses += "entity=pensyarah_subjek&no_pekerja=" + 
                $rootScope.sessionUser.no_pekerja;
        
            }
        
            $http.get(urlUserCourses).then(
                function (response) {
                    console.log(response.data);
        
                    if (response.data) {
                        $rootScope.userCourses = response.data;

                        //looping to store class timetable
                        var courses = $rootScope.userCourses.filter(course => course.sesi==currentSession && course.semester==currentSemester);
                        var promises = [];
                        for(i = 0; i < courses.length; i++) {
                            //push all timetable to array
                            promises.push(getUserTimetable($http, courses[i], currentSession, currentSemester));
                        }
                        Promise.all(promises).then(function(results) {
                            var allTimetable = results.reduce(function(allTimetable, timetable) {
                                return allTimetable.concat(timetable);
                            }, []);

                            //assign all class timetable to userTimetable

                            $scope.$apply(function() {
                                $rootScope.userTimetable = allTimetable;
                                console.log($rootScope.userTimetable);
                                $rootScope.userTimetable.forEach(function(item) {
                                    switch (item.hari) {
                                        case 1:
                                            item.day = "Sunday";
                                            break;
                                        case 2:
                                            item.day = "Monday";
                                            break;
                                        case 3:
                                            item.day = "Tuesday";
                                            break;
                                        case 4:
                                            item.day = "Wednesday";
                                            break;
                                        case 5:
                                            item.day = "Thursday";
                                            break;
                                        case 6:
                                            item.day = "Friday";
                                            break;
                                        case 7:
                                            item.day = "Saturday";
                                            break;
                                        default:
                                            item.day = "Invalid day";
                                    }
                                });
    
                                $rootScope.userTimetable.forEach(function(item) {
                                    switch (item.masa) {
                                        case 2:
                                            item.masa = "8:00 AM - 8.50 AM";
                                            break;
                                        case 3:
                                            item.masa = "9:00 AM - 9.50 AM";
                                            break;
                                        case 4:
                                            item.masa = "10:00 AM - 10.50 AM";
                                            break;
                                        case 5:
                                            item.masa = "11:00 AM - 11.50 AM";
                                            break;
                                        case 6:
                                            item.masa = "12:00 PM - 12.50 PM";
                                            break;
                                        case 7:
                                            item.masa = "1:00 PM - 1.50 PM";
                                            break;
                                        case 8:
                                            item.masa = "2:00 PM - 2.50 PM";
                                            break;
                                        case 9:
                                            item.masa = "3:00 PM - 3.50 PM";
                                            break;
                                        case 10:
                                            item.masa = "4:00 PM - 4.50 PM";
                                            break;
                                        case 11:
                                            item.masa = "5:00 PM - 5.50 PM";
                                            break;
                                        case 12:
                                            item.masa = "6:00 PM - 6.50 PM";
                                            break;
                                        default:
                                            item.masa = "Invalid time";
                                    }
                                });
                            });   
                        });
                    } else {
                        alert("Please enter valid user's session ID!");
                    }
                    // More implementation goes here ...
                },
                function (response) {
                    // 2nd function to handle connection error
                    alert("AJAX connection error!");
                }
            );
        }
        
        function getUserTimetable($http, userCourses, currentSession, currentSemester) {
            var urlUserTimetable = url;
        
            if(userCourses.sesi==currentSession && userCourses.semester==currentSemester){
                urlUserTimetable += "entity=jadual_subjek&sesi="+currentSession+"&semester="+currentSemester+"&kod_subjek=" 
                +userCourses.kod_subjek+"&seksyen="+userCourses.seksyen;
            }
            return $http.get(urlUserTimetable).then(function (response) {
                if (response.data) {
                    //return the 1 class details
                    return response.data;
                } else {
                    alert("Please enter valid user's session ID!");
                }
            }, function (response) {
                alert("AJAX connection error!");
            });
        }

        $scope.subject = function($http) {
            var urlSubject = url + "entity=subjek&sesi="+$rootScope.currentSession+"&semester="+ $rootScope.currentSemester ;

            $http.get(urlSubject).then(
                function (response) {
                    console.log(response.data);

                    if (response.data) {
                        $rootScope.subjek = response.data;
                    }
                },
                function (response) {
                    // 2nd function to handle connection error
                    alert("AJAX connection error!");
                }
            );
        }

        //Get Row Data
        $scope.getRowTData = function(event, item) {
            $scope.hari = item.hari;
            $scope.masa = item.masa;
            $scope.kod_subjek = item.kod_subjek;
            console.log($scope.hari);
            console.log($scope.masa);
            console.log($scope.kod_subjek);

            $scope.subject($http);
          }

        $scope.logout = function () { 
            console.log("Try to logout");
            $rootScope.sessionUser = null;
            $rootScope.sessionAdmin = null;
            $rootScope.userCourses = null;
            $rootScope.sessemList = null;
            $rootScope.userTimetable = null;
        }
    }
);