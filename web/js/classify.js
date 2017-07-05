		var classifyApp = angular.module("classifyApp", []);


classifyApp.controller('classify', ['$scope', '$http','$stateParams', function ($scope,$http, $stateParams) {
    $scope.name = 'fdasfdslafdsal';

    $scope.classify = '';
	$scope.dataset = [];
	$scope.add_condition = false;
	$scope.change_condition= false;
	$scope.thisclassify = '';
	$scope.oldData = '';

	$scope.unit = '';
	$scope.dataset2 = [];
	$scope.add_condition2 = false;

	$http.get(erp.localhost+'getdata').success(function(response){
		$scope.dataset = response;
		// console.log('成功')
		// console.log($scope.dataset)
			
		$http.get(erp.localhost+'getunit').success(function(response){
			$scope.dataset2 = response;
			console.log('成功')
		})

	})


    $scope.addShow = function(){
    	$scope.add_condition = true;
    };
    $scope.addWindow_save= function(){
    	$scope.add_condition = false;
    	console.log($scope.classify)

    	let data={classifyname:$scope.classify};
    	$http({
			method:'POST',
			url:erp.localhost+'addClassify',
			params:{data:data},
		}).success(function(response){
			console.log(response)
		})

		$scope.classify = '';
    	window.location.reload();

    };

	$scope.addWindow_close= function(){
		$scope.add_condition = false;
    };

    $scope.changeShow = function($event){
    	$scope.change_condition = true;
    	// $scope.thisclassify=obj.classifyname;
    	$scope.thisclassify = $event.target.parentElement.parentElement.firstElementChild.innerHTML;
    	$scope.oldData = $event.target.parentElement.parentElement.firstElementChild.innerHTML;
    	// console.log($scope.thisclassify);

    };
	$scope.changeWindow_save= function(){
    	$scope.change_condition = false;
    	let olddata = $scope.oldData;
		let newdata = $scope.thisclassify;
		let data = {old:olddata,new:newdata};
		$http({
			method:'POST',
			url:erp.localhost+'changeClassify',
			params:{data:data},
		}).success(function(response){
			console.log('1111111')
		})


    	window.location.reload();
    };
	$scope.changeWindow_close= function(){
    	$scope.change_condition = false;

    	window.location.reload();
    };

    $scope.deleate= function($event){
    	let delClassify = $event.target.parentElement.parentElement.firstElementChild.innerHTML;
    	console.log(1111111)
    	let canselmessage=confirm("确定删除此分类？");
    	if(canselmessage==true)  
	    {  


	 	$http({
			method:'POST',
			url:erp.localhost+'delClassify',
			params:{data:delClassify},
		}).success(function(response){
			console.log(response)
		})
	    	window.location.reload();
	    }  
	    else if(canselmessage==false)  
	    {  
	    	console.log('取消删除');
	    }  
    };


	$scope.addShow2= function(){
    	$scope.add_condition2 = true;
    };
	$scope.addWindow_close2= function(){
		$scope.add_condition2 = false;
    };
    $scope.addWindow_save2= function(){
    	$scope.add_condition2 = false;
    	console.log($scope.unit)

    	let data={unitname:$scope.unit};
    	$http({
			method:'POST',
			url:erp.localhost+'addUnit',
			params:{data:data},
		}).success(function(response){
			console.log(response)
		})

		$scope.unit = '';
    	window.location.reload();

    };
	$scope.deleate2= function($event){
			let delUint = $event.target.parentElement.parentElement.firstElementChild.innerHTML;
    	let canselmessage=confirm("确定删除此单位？");
    	if(canselmessage==true)  
	    {  
	 	$http({
			method:'POST',
			url:erp.localhost+'delUnit',
			params:{data:delUint},
		}).success(function(response){
			console.log(response)
		})
	    	window.location.reload();
	    }  
	    else if(canselmessage==false)  
	    {  
	    	console.log('取消删除');
	    }  

	};
	$scope.closeTable1= function(){
		$('#table1').fadeToggle(400);
		
	};
	$scope.closeTable2= function(){
		$('#table2').fadeToggle(400);
		
	};

}]);