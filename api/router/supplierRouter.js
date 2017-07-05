var mysql = require('../module/mysql-cy-module.js');

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

exports.Register = function(app){

    app.post('/fromSupplier',function(request, response){
        let arr = [];
        let hasIt = false;
        let data = 'SELECT * FROM  supplier'
        // 2参数：查询命令,回调函数
        mysql.exists(data,function(result){
            if(request.query.data){
                result.forEach(function(item){
                    //item -> 对象
                    for(var attr in item){
                        //item[attr] --> 每一个值
                        if(typeof item[attr]!="number"){
                            if(item[attr].indexOf(request.query.data)>-1){
                                hasIt=true;
                            } 
                        }   
                    }
                    if(hasIt){arr.push(item)}
                    hasIt=false
                })
                response.send(arr)
            }else{
                response.send(result)
            }
        })   
    })

    app.post('/ToSupplier',urlencodedParser,function(request,response){
    	// 转换数组对象
    	request.query.data = JSON.parse(request.query.data)
  		let data = 'SELECT * FROM  supplier'

    	mysql.exists(data,function(result){
    		let isExists = false
    		result.forEach(function(item){
    			if(item.supplierName == request.query.data.supplierName){isExists=true}
    		})
        	if(isExists){
        		response.send('该供应商已存在')

        	}else{
                console.log('laaaaaaaaaaa',request.query.data)
        		// 数据格式(---{a:1,b:'发',c:'b'}---)转化(---' 1,"发","b" '---)
        		let newData = '';
        		for(attr in request.query.data){
        			request.query.data[attr] = '"' + request.query.data[attr] + '"';
        			newData += request.query.data[attr]+','
        		}
        		newData=newData.slice(0,-1) 
				console.log(newData,typeof newData)

        		let condition = 'INSERT INTO supplier(supplierNumber,supplierName,supplierSpell,supplierContacts,supplierPhone,supplierAdress,supplierRemarks) VALUES('+newData+')'

        		// 2参数：插入数据命令,回调函数
        		mysql.add(condition,function(result){
        			console.log(result)
        			response.send('新增成功')
        		})
        	}
        })
    	
    })

    app.post('/DelSupplier',urlencodedParser,function(request,response){
        // 转换数组对象
        request.query.data = JSON.parse(request.query.data)
        let condition = 'DELETE FROM supplier where supplierName="'+request.query.data.supplierName+'"';
        mysql.del(condition,function(result){
            response.send('删除成功')
        })
        
    })

    app.post('/AlterSupplier',urlencodedParser,function(request,response){
        // 转换数组对象
        request.query.data = JSON.parse(request.query.data)

        let newData = [];
        for(attr in request.query.data){
            // request.query.data[attr] = '"' + request.query.data[attr] + '"';
            newData.push(request.query.data[attr])
        }
        console.log('newData',newData) 

        var condition = 'UPDATE supplier SET supplierNumber = ?,supplierName = ?,supplierSpell = ?,supplierContacts = ?,supplierPhone = ?,supplierAdress = ?,supplierRemarks = ? WHERE indexId = ?';

        console.log('condition',condition)
        mysql.change(condition,newData,function(result){
            response.send('修改成功')
        })
        
    })

    
    
}



