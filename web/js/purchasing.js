
var purApp = angular.module("purApp", ["globalapp"]);
  purApp.controller('purchasing',['$scope','$http',function($scope,$http){
        		// console.log($('.table').css('textAlign','center'))
        		$scope.addpur = {
        			addpurs:"新增采购产品",
        			addsome:"批量导入",
        			outsome:"批量导出"
        		};

        		//获取采购列表
        		$.post('http://localhost:8888/getProducts').success(function(res){
							console.log('ssss',res)
							$scope.data = res.data;
												
					})
        		//获取商品单位
        		$.post('http://localhost:8888/classify').success(function(res){
								console.log('unit',res)
							$scope.dataunit = res.data;
							console.log($scope.dataunit)							
					})
        		//获取商品类型
        		$.post('http://localhost:8888/goodstype').success(function(res){
								console.log('goodstype',res)
							$scope.datatype = res.data;
							// console.log($scope.dataunit)							
					})
       			// $scope.goodstype = "数据类型";
        		$scope.sjsc = function(){

        			$scope.num = (Math.random()+'').slice(2,15);
        			// console.log($scope.num)
        		};
        		$scope.purpro = function(){
        			console.log(8989)
        			$scope.conshow = !$scope.conshow;
        		}
        		$scope.save = function(){

        			if($scope.num&&$scope.spmc&&$scope.goodstype&&$scope.goodsnum&&$scope.goodsunit&&$scope.buyprice&&$scope.suppliername&&$scope.totalprice){
							var obj = {
								"proid":$scope.num,
								"goodstitle":$scope.spmc,
								"goodstype":$scope.goodstype,
								"goodsnum":$scope.goodsnum,
								"goodsunit":$scope.goodsunit,
								"buyprice":$scope.buyprice,
								"totalprice":$scope.totalprice,
								"suppliername":$scope.suppliername
							}

		        			$http({
		        					method:'post',
		        					url:'http://localhost:8888/addProducts',
		        					// params:{"goodsunit":"23","goodsnum":"2"},
		        					data:obj,
		        				}).then(function(response){
		        					$('input').val('');
		        					$scope.data = response.data.data;
		        				})
				
        			}else{
        				alert('有字段为空');
        			}

        		}

        		$scope.delgoods = function($index){

        				$http({
	        					method:'post',
	        					url:'http://localhost:8888/delProducts',
	        					// params:{"goodsunit":"23","goodsnum":"2"},
	        					data:{"proid":$scope.data[$index].proid},
	        				}).then(function(response){
	        					console.log('del',response.data.data)
	        					$scope.data = response.data.data;
		        			})
        		}
        		$scope.edit = function($index){
        			$scope.conshows = !$scope.conshows;
        			console.log(7)
        			$http({
        					method:'post',
        					url:'http://localhost:8888/getProducts',
        					// params:{"goodsunit":"23","goodsnum":"2"},
        					data:{"proid":$scope.data[$index].proid},
        				}).then(function(response){
        					// $('input').val('');
        					$scope.editpros = response.data.data[$index];
        					$scope.nums = $scope.editpros.proid;
        					$scope.spmcs = $scope.editpros.goodstitle;
        					$scope.goodsunits=$scope.editpros.goodsunit;
        					$scope.goodsnums=$scope.editpros.goodsnum;
        					$scope.buyprices=$scope.editpros.buyprice;
        					$scope.totalprices=$scope.editpros.totalprice;
        					$scope.suppliernames=$scope.editpros.suppliername;
        					$scope.goodstypes=$scope.editpros.goodstype;

        				})   				
		        				
        		}
        		$scope.purpros = function($index){
        			$scope.conshows = !$scope.conshows;
        		}

        		$scope.saves = function($index){
        			
        			var obj = {
								"proid":$scope.nums,
								"goodstitle":$scope.spmcs,
								"goodstype":$scope.goodstypes,
								"goodsnum":$scope.goodsnums,
								"goodsunit":$scope.goodsunits,
								"buyprice":$scope.buyprices,
								"totalprice":$scope.totalprices,
								"suppliername":$scope.suppliernames
							}

					$http({
	        					method:'post',
	        					url:'http://localhost:8888/changeProducts',
	        					// params:{"goodsunit":"23","goodsnum":"2"},
	        					data:obj,
	        				}).then(function(response){
	        					console.log('更改数据',response)
	        					// $scope.data = response.data.data;
		        			})



        		}
        		

        }])