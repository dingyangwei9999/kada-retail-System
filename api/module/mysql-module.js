var mysql = require('mysql');
var connection;
function createConnection(){
	connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		port: '3306',
		database: 'angular'
	});

}



//查询表的全部数据
var exists = function(data,_callback){
	createConnection();
	connection.connect();

	//data代表查询product表的全部数据的条件,product表示你自己创建的数据表名。
	//这里的data是暂时写在这里的，方便你们了解，真实的情况需要你们自己从自己的路由那里传入参数进来，具体情况自己动手解决。
	var datas = 'SELECT * FROM ' + data
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

var add = function(condition,newData,_callback){

	//conditon是,newData也是模拟的数据
	var  condition = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
	var  newData = ['菜鸟工具', 'https://c.runoob.com','23453', 'CN'];
	//增
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

var change=function(condition,newData,_callback){
 	console.log(newData)
 	createConnection();

	 //说明跟上面一样
	// var condition = 'UPDATE websites SET name = ?,url = ? WHERE Id = ?';
	// var newData = ['菜鸟移动站', 'https://m.runoob.com',6];
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

	connection.connect();
	//说明跟上面的一样
 
	var condition = 'DELETE FROM websites where id=6';
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

exports.exists = exists;
exports.add = add;
exports.change = change;
exports.del = del;