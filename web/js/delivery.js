var lhapp = angular.module('lhApp',[])

lhapp.controller('lhController',['$scope','$http',function($scope,$http){
	$http.post('http://localhost:8888/lhgetData').then(function(response){
		console.log(response.data)
		$scope.data = response.data
	})
	$scope.search = function(){
	
	var obj={}
	obj.name=$scope.name
	obj.num=$scope.num

	var objs = JSON.stringify(obj)

		$http({
			method:'POST',
			url:'http://localhost:8888/lhsearchData',
			params:{'data':objs}
		}).then(function(response){
			$scope.data = response.data;
		})
	}
}])