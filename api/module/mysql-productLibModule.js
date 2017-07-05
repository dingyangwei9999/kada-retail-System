var mysql = require('mysql');

function createConnection(){
	connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		port: '3306',
		database: 'retailSystem'
	});
	connection.connect();
}


//查询表的全部数据
var exists = function(table,_callback){

	createConnection();

	var datasql = 'SELECT * FROM ' + table;
	connection.query(datasql,function(err,result){
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

var add = function(condition,_callback){
	createConnection()
	// var condition = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
	// var newData = ['菜鸟工具', 'https://c.runoob.com','23453', 'CN'];

	connection.query(condition,function (err, result) {
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

var change=function(condition,newData,_callback){
 
	createConnection();

	 //说明跟上面一样
	var condition = 'UPDATE websites SET name = ?,url = ? WHERE Id = ?';
	var newData = ['菜鸟移动站', 'https://m.runoob.com',6];
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

	createConnection();
	//说明跟上面的一样
 
	var condition = 'DELETE FROM delivery where barcode='+condition;
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

//查询表的数据 分页
var existsLimit = function(table, limitM, limitN, _callback){

	createConnection();
	limitM = limitM || 0;
	limitN = limitN || 50;
	var datasql = 'SELECT * FROM ' + table + ' LIMIT ' + limitM + ',' + limitN;
	connection.query(datasql,function(err,result){
		if (err) {
			console.log('[SELECT ERROR] - ',err);
			return;
		}else{
			// console.log(result)
			_callback(result)
		}
	});

	connection.end();
};

//查询表的数据 条件
var existsCondition = function(table, key, value, _callback){
	if(!(key && value)){return ;}
	createConnection();

	var datasql = 'SELECT * FROM ' + table + ' WHERE `' + key + '` = ' + value;
	connection.query(datasql,function(err,result){
		if (err) {
			console.log('[SELECT ERROR] - ',err);
			return;
		}else{
			_callback(result)
		}
	});

	connection.end();
};

exports.exists = exists;
exports.add = add;
exports.change = change;
exports.del = del;
exports.existsLimit = existsLimit;
exports.existsCondition = existsCondition;