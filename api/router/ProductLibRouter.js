var db = require('../module/mysql-productLibModule.js');

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

exports.Register = function(app){

    //获取所有商品
    app.get('/jygetProducts', function(request, response){
        db.existsLimit('delivery', request.query.limitM, request.query.limitN, function(result)       
        {
            response.send(result);
        });
    });



    app.post('/jyaddProducts',urlencodedParser,function(request,response){

        let data = JSON.parse(request.body.data);
        let fieldName = Object.keys(data).join(',');
        let value = data.barcode;

    	db.existsCondition('productlib', 'barcode', value,function(result){
    		let isExists = false
    		result.forEach(function(item){
    			if(item.supplierName == data.supplierName){isExists=true}
    		})
        	if(isExists){
        		response.send('该供应商已存在')
        	}else{
    //     		数据格式(---{a:1,b:'发',c:'b'}---)转化(---' 1,"发","b" '---)
        		let newData = '';
        		for(attr in data){
    				data[attr] = '"' + data[attr] + '"';
        			newData += data[attr]+','
        		}
        		newData=newData.slice(0,-1) 
				console.log(fieldName,data)

        		let condition = 'INSERT INTO productlib('+ fieldName +') VALUES('+ newData +')'
                console.log(condition)
                response.send('新增成功');
        		// 2参数：插入数据命令,回调函数
        		db.add(condition,function(result){
        			console.log(result)
        			response.send('新增成功')
        		})
        	}
        })
    	
    })

    app.post('/jydelProducts',urlencodedParser,function(request,response){

        let data = request.body;
        console.log(data)
        let value = data.barcode;

        db.del(data.barcode,function(result){
            response.send('已删除')
        })
    })    
}

