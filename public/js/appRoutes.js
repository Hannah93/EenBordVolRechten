// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // nerds page that will use the LeerkrachtController
        .when('/InlogLeerkracht', {
            templateUrl: 'views/InlogLeerkracht.html',
            controller: 'LeerkrachtController'
        })

        .when('/SignUp', {
            templateUrl: 'views/SignUp.html',
            controller: 'SignupController'
        })

        .when('/InlogLeerling', {
            templateUrl: 'views/InlogLeerling.html',
            controller: 'LeerlingController'
        });

    $locationProvider.html5Mode(true);

}]);