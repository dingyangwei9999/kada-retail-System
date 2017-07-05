var bodyParser = require('body-parser');
var mysqlDB = require('./mysql-module')
;
var mysqldagou = require('./dagouMql')

var urlencodedParser = bodyParser.urlencoded({ extended: false });

exports.Register = function(app){

	app.post('/Data',urlencodedParser,function(request, response){
		console.log(111,"===>",request.query.barcode)
		mysqldagou.existsCode('purchaseform',request.query.barcode,function(result){
			response.send(result);
		})
	})
	app.post('/cashierData',urlencodedParser,function(request, response){
		mysqldagou.exists('purchaseform',function(result){
			response.send(result);
		})
	})
	app.post('/changeData',urlencodedParser,function(request, response){
		var data = JSON.parse(request.query.barcode)
		console.log(request.query.barcode,data)
  	 	data.forEach(function(item){
             let newData = [];
	        for(attr in data){
	            // request.query.barcode[attr] = '"' + request.query.barcode[attr] + '"';
	            // newData.push(item[attr])
	              newData.push(request.query.barcode[attr])
	        }
	    })
        console.log('newData',newData) 
		var condition = 'UPDATE purchaseform SET cash = ? WHERE barcode = ?';
		mysqldagou.change(condition,newData,function(result){
			response.send(result)
		})
	})	
	
}