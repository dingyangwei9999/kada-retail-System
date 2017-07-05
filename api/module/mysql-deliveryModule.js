var mysql = require('mysql');

function open(){
	connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		port: '3306',
		database: 'hlh'
	})
}


//查询表的全部数据
var exists = function(_connection,_callback){
	open()

	// var datas = 'SELECT * FROM ' + _connection
	var datas = `	
		SELECT
			delivery.indexId,
			purchaseform.proid,
			purchaseform.goodstitle,
			supplier.supplierName,
			unit.unitname,
			classify.classifyname,
			purchaseform.buyprice,
			delivery.rePrice,
			purchaseform.goodsNum,
			purchaseform.totalprice,
			purchaseform.inventory,
			delivery.setDate
		From
			delivery
			INNER JOIN classify on delivery.category = classify.indexid
			INNER JOIN unit on delivery.unit = unit.indexid
			INNER JOIN supplier on delivery.supplier = supplier.indexID
			INNER JOIN purchaseform on delivery.name = purchaseform.indexid
`
	connection.query(datas,function(err,result){
		if (err) {
			console.log(err)
		}else{
			console.log(result)
			_callback(result)
		}
	});

	connection.end();
};

//添加表的数据

var add = function(database,newData,_callback){
	open()

	var  condition = 'INSERT INTO ' + database + ' (indexId,unit,catagory) VALUES(0,?,?)';
	
	connection.query(condition,newData,function (err, result) {
        if(err){
			console.log(err)
			return;
        } else{
        	_callback(result)
        }      
	 
	});
 
	connection.end();
}

//更新表的数据

var change=function(_connection,newData,_callback){
 	open()

	var condition = 'UPDATE ' + _connection + ' SET inventory = ?,totalprice = ? WHERE proid = ?';
	console.log(condition)
	//改
	connection.query(condition,newData,function (err, result) {
	   if(err){
	         console.log(err)
	         return;
	   }else{
	   		_callback(result)
	   }     
	  
	});
	 
	connection.end();
}

//删除数据

var del = function(condition,_callback){

	open();
 
	var condition = 'DELETE FROM purchaseform where proid='+condition;
	//删
	connection.query(condition,function (err, result) {
        if(err){
			console.log(err)
			return;

        } else{
        	_callback(result)
        }      
	});
}


//根据条件查询表的数据
var search = function(_connection,condition,_callback){
	open()

	var datas =`
		SELECT
			delivery.indexId,
			purchaseform.proid,
			purchaseform.goodstitle,
			supplier.supplierName,
			unit.unitname,
			classify.classifyname,
			purchaseform.buyprice,
			delivery.rePrice,
			purchaseform.goodsNum,
			purchaseform.totalprice,
			purchaseform.inventory,
			delivery.setDate
		From
			delivery
			INNER JOIN classify on delivery.category = classify.indexid
			INNER JOIN unit on delivery.unit = unit.indexid
			INNER JOIN supplier on delivery.supplier = supplier.indexID
			INNER JOIN purchaseform on delivery.name = purchaseform.indexid
	
	` + ' WHERE goodstitle = "' + condition +'"';

	connection.query(datas,function(err,result){
		if (err) {
			console.log(err)
		}else{
			console.log(result)
			_callback(result)
		}
	});
	connection.end();
};


exports.exists = exists;
exports.add = add;
exports.change = change;
exports.del = del;
exports.search = search;