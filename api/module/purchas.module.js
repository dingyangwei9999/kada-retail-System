var mysql = require('mysql');
var apiResult = require('./apiResult.module');

var connection;
function aa(){
	 connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		port: '3306',
		database: 'hlh'
	});
}	

var TEST_DATABASE = 'erp'; 
var TEST_TABLE = 'purchaseForm'; 
//查询表的全部数据
var exists = function(table,_callback){

	aa();
// connection.connect();
// connection.query('use ' + TEST_DATABASE)
	//data代表查询product表的全部数据的条件,product表示你自己创建的数据表名。
	//这里的data是暂时写在这里的，方便你们了解，真实的情况需要你们自己从自己的路由那里传入参数进来，具体情况自己动手解决。
	var data = 'SELECT * FROM '+ table;
	connection.query(data,function(err,result){
		if (err) {
			_callback(result);		
		}else{
			// console.log(result)
			_callback(apiResult(true,'',result))
		}
	});

	connection.end();
};

//添加表的数据

var add = function(newData,_callback){
	aa();
	// connection.connect();
	//conditon是,newData也是模拟的数据
var  condition = 'INSERT INTO purchaseform(proid,goodstitle,goodstype,goodsnum,goodsunit,buyprice,suppliername,totalprice) VALUES(?,?,?,?,?,?,?,?)';
	// var  newData = ['菜鸟工具', 'https://c.runoob.com','23453', 'CN'];
	//增
	console.log(newData)
	connection.query(condition,newData,function (err, result) {
        if(err){
         	// _callback(result);
         	console.log('11',err)
         return;
        } else{
        	console.log('00',result)
        	_callback(result);
        }      
	 
	});
 
	connection.end();
}

//更新表的数据

var change=function(data,_callback){
 	
	// connection.connect();
	aa();
	 //说明跟上面一样
	var condition = 'UPDATE purchaseForm SET goodstitle = ?,goodstype = ?,goodsnum = ?,goodsunit=?,buyprice=?,suppliername=?,totalprice=? WHERE proid = ?';
	// var newData = ['菜鸟移动站', 'https://m.runoob.com',6];
	//改
	console.log('arr',data)
	connection.query(condition,data,function (err, result) {
	   if(err){
	         console.log(err)
	         return;
	   }else{
	   		console.log('修改后的',result)
	   		_callback(result)
	   }     
	  
	});
	 
	connection.end();
}

//删除数据

var del = function(data,_callback){
	aa();
	connection.connect();
	//说明跟上面的一样
 
	var condition = 'DELETE FROM purchaseForm where proid='+data;
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

var cz = function(data,_callback){
	aa();
	connection.connect();
	//说明跟上面的一样
 
	var condition = 'SELECT * FROM purchaseForm where proid='+data;
	//删
	connection.query(condition,function (err, result) {
        if(err){
			console.log(err)
			return;

        } else{
        		console.log('我是cz',result.proid)
        	_callback(result)
        }      
	});
}




exports.exists = exists;
exports.add = add;
exports.change = change;
exports.del = del;
exports.cz = cz;