var myApp = angular.module("myApp", ['ui.router','purApp']);
        myApp.config(function ($stateProvider, $urlRouterProvider) {
   
       		$stateProvider
	           .state("classifyManage", {
	               url: "/classify",//当 url 为#/pagetab
	               templateUrl: "classify.html?_" + Math.random(),
	               controller: 'classify'
	           })
	           .state("purchasing",{
	           		url:"/purchasing",
	           		templateUrl:"purchasing.html",
	           		controller:"purchasing"
	           })
        });
        myApp.controller('classify', function ($scope, $stateParams) {
            $scope.name = 'fdasfdslafdsal';
            $scope.classify = '';
			$scope.saveClass = function() {
				console.log($scope.classify)
		    };
        });
      