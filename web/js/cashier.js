var cashierApp = angular.module('cashierApp',[]);

cashierApp.controller('cashier', ['$scope', '$stateParams','$http',function($scope, $stateParams,$http) {
	$http.post(erp.localhost+'cashierData').then(function(response){
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
			url:erp.localhost+'Data',
			params:{'cashierName':cashierName}
		}).then(function(response){
			console.log(response)
		})
	}
}]);
