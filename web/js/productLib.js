var product = angular.module('productLib', []);

product.controller('productlibController', ['$scope', '$stateParams','$http', function($scope, $stateParams,$http){
	// productHandle.processingData($scope);
	// $scope.addData = productHandle.addData($scope);
	$http({
		method: 'POST',
		url: erp.localhost + 'lhgetData'
	}).then(function(response){
		if(response.status === 200){
			var dataset = response.data;
			$scope.dataset = dataset;
		}
	});
	// $http.get('http://localhost:8888/getProducts').success(function(response){
	// 	console.log(response);
	// });
	
	$scope.addData = function(obj){
		obj = angular.toJson(obj);
		$http({
			method: 'POST',
			url: erp.localhost + 'addProducts',
			data: {data:obj}
		}).success(function(response){
			$.alert(response)
		});	
	}

	$scope.editInfo = function(obj){
		$scope.editInput = obj.inventory;
		$scope.editFromProid = obj.proid;
		$scope.totalprice = obj.totalprice;
		console.log(obj.inventory);
		$('.productShade').toggle();
	}

	$scope.btnConfirm = function(){
		var value = $scope.editInput;
		var proid = $scope.editFromProid;
		var totalprice = $scope.totalprice;
		var obj = {inventory:value, proid:proid, totalPrice:totalprice};
		obj = angular.toJson(obj);
		$http({
			method: 'POST',
			url: erp.localhost + 'changeInventory',
			data: {data:obj}
		}).success(function(response){
			console.log(response)
		});	
		$('.productShade').toggle();		
	}

	$scope.closeShade = function(){
		console.log(111)
		$('.productShade').toggle()
	}

	$scope.delData = function(obj){
		var value = obj.proid;
		console.log(value)
		$http({
			method: 'POST',
			url: erp.localhost + 'delProducts',
			data: {barcode:value}
		}).success(function(response){
			$.alert(response)
		});	
	}
}]);

// product.factory('productHandle', ['$http', function($http){
// 	return {
// 		processingData: function(scope){
// 			$http({
// 				method: 'GET',
// 				url: erp.localhost + 'getProducts'
// 			}).then(function(response){
// 				if(response.status === 200){
// 					var dataset = response.data;
// 					scope.dataset = dataset;
// 				}
// 			});
// 			// $http.get('http://localhost:8888/getProducts').success(function(response){
// 			// 	console.log(response);
// 			// });
// 		},
// 		addData: function(scope){
// 			return function(){
// 				var obj = scope.dataset[0];
// 				obj.barcode = 11111;
// 				obj = angular.toJson(obj);
// 				$http({
// 					method: 'POST',
// 					url: erp.localhost + 'addProducts',
// 					data: {data:obj}
// 				}).then(function(response){
// 					console.log(response)
// 				});
// 			}
			
// 		}
// 	}
// }]);