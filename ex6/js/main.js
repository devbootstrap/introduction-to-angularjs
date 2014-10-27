var app = angular.module("myApp", ['ngRoute'])

app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: "templates/home.html" ,
    controller: "HomeController"
  })
  .when('/settings', {
    templateUrl: 'templates/settings.html',
    controller: 'SettingsController'
  })
  .otherwise({redirectTo: '/'});
});

app.factory("SettingsService", function($http) {
  return {
    get: function() {
      return $http.get("/ex6/data/settings.json")
    },
    update: function(id, data) {
      return $http.put("/settings/" + id + "/", data);
    }
  };
});

app.controller("HomeController", function($scope) {

});

app.controller("SettingsController", function($scope, SettingsService) {
  $scope.settings = {
    name: "Darren",
    email: "darren@devbootstrap.com"
  }

  $scope.updateSettings = function() {
    console.log("updateSettings was called!");
    var res;
    res = SettingsService.update(1, $scope.settings);
    res.success(function(data) {
      return $scope.settings = data;
    });
  };

  $scope.loadSettings = function() {
    console.log("loadSettings was called!");
    var res;
    res = SettingsService.get();
    res.success(function(data){
      console.log("Settings from server", data);
      $scope.settings = data;
    })
  }

});
