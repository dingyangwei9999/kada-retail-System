var supplier_js = angular.module('supplier_module',[]);

supplier_js.controller('supplier', ['$scope', '$stateParams','$http',function ($scope, $stateParams,$http) {
	$('.supplier_aside2').hide()
	$('.supplier_aside').hide()

	$scope.formData=[];
	$http.post(erp.localhost1+'fromSupplier').success(function(response){
		console.log(response)
		$scope.formData = response;
	})

	// 新增供应商的窗口显示隐藏
	$scope.hideAdd = function hideSupplierAdd(){
		$('.supplier_aside').hide(1000)

	} 
	$scope.showAdd = function blockSupplierAdd(){
		$('.supplier_aside2').hide()
		$('.supplier_aside').show(1000)
	}
	// 新增供应商的表单数据
	$scope.supplierNumber;
	$scope.supplierName;
	$scope.supplierSpell;
	$scope.supplierContacts;
	$scope.supplierPhone;
	$scope.supplierAdress;
	$scope.supplierRemarks;  

	$scope.saveAdd = function save(){
		let data = {
			supplierNumber:$scope.supplierNumber || '',
			supplierName:$scope.supplierName || '',
			supplierSpell:$scope.supplierSpell || '',
			supplierContacts:$scope.supplierContacts || '',
			supplierPhone:$scope.supplierPhone || '',
			supplierAdress:$scope.supplierAdress || '',
			supplierRemarks:$scope.supplierRemarks || '',
		}

		$http({
			method:'POST',
			url:erp.localhost1+'ToSupplier',
			params:{data:data},
		}).success(function(response){
			$.alert(response)
			$http.post(erp.localhost1+'fromSupplier').success(function(response){
				$scope.formData = response;
			})
			$scope.supplierNumber=''
			$scope.supplierName=''
			$scope.supplierSpell=''
			$scope.supplierContacts=''
			$scope.supplierPhone=''
			$scope.supplierAdress=''
			$scope.supplierRemarks=''
		})	
	}

	// 编辑供应商的窗口显示隐藏
	$scope.hideAdd2 = function hideSupplierAdd2(){
		$('.supplier_aside2').hide(1000)
	} 
	$scope.showAdd2 = function blockSupplierAdd2(data){
		$('.supplier_aside').hide()
		$('.supplier_aside2').show(1000)
		$scope.onlyCode = data.indexID;
		$scope.supplierNumber2=data.supplierNumber;
		$scope.supplierName2=data.supplierName;
		$scope.supplierSpell2=data.supplierSpell;
		$scope.supplierContacts2=data.supplierContacts;
		$scope.supplierPhone2=data.supplierPhone;
		$scope.supplierAdress2=data.supplierAdress;
		$scope.supplierRemarks2=data.supplierRemarks; 
	}
	// 编辑供应商信息的删除
	$scope.delSupplier = function del_Supplier(){
		let data = {
			supplierName:$scope.supplierName2,
		}

		$http({
			method:'POST',
			url:erp.localhost1+'DelSupplier',
			params:{data:data},
		}).success(function(response){
			console.log('dellllllllllllllll')
			$scope.supplierNumber2='';
			$scope.supplierName2='';
			$scope.supplierSpell2=''
			$scope.supplierContacts2=''
			$scope.supplierPhone2=''
			$scope.supplierAdress2=''
			$scope.supplierRemarks2=''
			$.alert(response)
			$http.post(erp.localhost1+'fromSupplier').success(function(response){
				$scope.formData = response;
			})	
		})
	} 

	// 编辑供应商的修改
	$scope.alterAdd = function alter(){
		let data = {
			supplierNumber:$scope.supplierNumber2 || '',
			supplierName:$scope.supplierName2 || '',
			supplierSpell:$scope.supplierSpell2 || '',
			supplierContacts:$scope.supplierContacts2 || '',
			supplierPhone:$scope.supplierPhone2 || '',
			supplierAdress:$scope.supplierAdress2 || '',
			supplierRemarks:$scope.supplierRemarks2 || '',
			indexID:$scope.onlyCode,
		}
		$http({
			method:'POST',
			url:erp.localhost1+'AlterSupplier',
			params:{data:data},
		}).success(function(response){
			$http.post(erp.localhost1+'fromSupplier').success(function(response){
				$scope.formData = response;
			})
			$.alert(response)
		})	
	}

	// 查询关键字
	$scope.query = function query(){
		$scope.queryWord
		$http({
			method:'POST',
			url:erp.localhost1+'fromSupplier',
			params:{data:$scope.queryWord},
		}).success(function(response){
			$scope.formData =response
		})	
	}

	$scope.mykeyup = function mykeyup(e){

		
		var keycode = window.event? e.keyCode :e.which; 
		console.log(keycode)
		if(keycode==13){
			$scope.query() 
		}
	}
           
}]);










