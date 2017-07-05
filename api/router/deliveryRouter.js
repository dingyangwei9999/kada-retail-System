var multer = require ('multer');

var db = require('../module/mysql-deliveryModule.js');
var apiResult = require('../module/ApiResult.js');

//引入的中间件的插件用于数据转化时转换成功
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

exports.Register = function(app){
	app.post('/lhgetData',urlencodedParser,function(request, response){
	

		db.exists('aaa',function(result){
			response.send(result);
		});
	});

	// app.post('/addData',function(request, response){
	
	// 	var name = JSON.parse(request.query.data).name
	// 	var num = JSON.parse(request.query.data).num

	// 	var  newData = [name,num];

	// 	db.add('units',newData,function(result){
	// 		response.send(result)
	// 	});
	// });
	

	app.post('/lhsearchData',function(request,response){

		var name = JSON.parse(request.query.data).name

		db.search('purchaseform',name,function(result){
			response.send(result)
		})
	})

	 app.post('/lhdelProducts',urlencodedParser,function(request,response){

        let data = request.body;
        console.log(data)
        let value = data.barcode;

        db.del(data.barcode,function(result){
            response.send('已删除')
        })

    })

	app.post('/changeInventory',urlencodedParser,function(request,response){
		let bodys = JSON.parse(request.body.data)
		let data =bodys.inventory;
		let proid =bodys.proid;
		let totalPrice =bodys.totalPrice

		let dataArr = [data,totalPrice,proid]

		console.log(dataArr)

		db.change('purchaseform',dataArr,function(result){
		
			response.send(result)
		})
	})
}



