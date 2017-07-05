var cashierApp = angular.module('cashierApp',[]);

cashierApp.controller('cashier', ['$scope', '$stateParams','$http',function($scope, $stateParams,$http) {
	$http.post('http://localhost:8888/cashierData').then(function(response){
		$scope.cashierData = response.data;
		console.log(response.data)     
	}) 
 	$scope.cashMoney = function(){
	 	console.log(999)
	}
	$scope.searchData = function(){
		console.log("++++",$scope.barCode)
		let cashierName = $scope.barCode;
		$http({
			method:"POST",
			url:'http://localhost:8888/Data',
			params:{'cashierName':cashierName}
		}).then(function(response){
			console.log(response)
		})
	}
}]);
