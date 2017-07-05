var shouyinApp = angular.module('shouyinApp',[]);

shouyinApp.controller('shouyin', ['$scope', '$stateParams','$http',function($scope, $stateParams,$http) {
	$scope.newQit = [];
	$scope.newCode = [];
	$scope.newData = [];
	$scope.shouNum = 1;
	$scope.total = '0.00';
	$scope.count = 0;
	$scope.getGoods = function(num){
		let cashierName = $scope.num;
		let stateShou = true;
		($scope.newData||[]).map(function(item,index){
			if (item.proid === cashierName){
				console.log($scope.newData[index].quit)
			 	$scope.newData[index].quit = Number($scope.newData[index].quit)+1 
		 		$scope.total =Number($scope.total)+ Number($scope.newData[index].buyprice);
		 		// $scope.newQit.push($scope.newData[index].barcode,$scope.newData[index].quit)
		 		$scope.count++;
				stateShou=false;
				$scope.num = null;
				// $scope.newCode.push({'barcode':$scope.newData,'cash':$scope.newQit})
				// console.log($scope.newData,$scope.newQit)
			}
			// return $scope.newData
		})
		if(cashierName && stateShou){
			$http({
				method:"POST",
				url:'http://localhost:8888/Data',
				params:{'barcode':cashierName}
			}).then(function(response){
				console.log(response.data[0])
				let shuzhi = response.data[0];
				// $scope.total = shuzhi.rePrice;
				if(shuzhi){
					$scope.total = Number($scope.total)+Number(response.data[0].buyprice);
					$scope.newData.push(shuzhi);
					$scope.num = null;
					$scope.count++;
					// console.log($scope.newData[0].rePrice)
				}
			})
		}
	}
	$scope.cashierJie= function(){
		if ($scope.shouqian) {
			$scope.zhao = $scope.shouqian- $scope.total;
		}
	}
	$scope.delData = function(){
		$scope.newData.map(function(item,index){
			$scope.newCode.push({'barcode':$scope.newData[index].barcode,'cash':$scope.newData[index].quit})
			console.log($scope.newCode)
		})
		// $http({
		// 		method:"POST",
		// 		url:'http://localhost:8888/changeData',
		// 		params:{'barcode':$scope.newCode}
		// }).then(function(response){
		// 		console.log(response)
		// })
		$scope.newData=[];
		$scope.total = '0.00';
		$scope.count = 0;


	}
}]);