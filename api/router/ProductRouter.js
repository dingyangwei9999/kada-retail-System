var db = require('../module/classify-module');
// var ApiResult = require('../module/ApiResult');
var multer = require ('multer');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })


var storage = multer.diskStorage({  
  destination: function (req, file, cb) {  
    cb(null, '../upload')  
  },  
  filename: function (req, file, cb) {  
      var fileFormat = (file.originalname).split(".");
      cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);    
  }  
}) 

var upload = multer({ storage: storage })
	

exports.Register = function(app){
console.log('已连接')

	//允许设置跨越
	app.all('*', function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
		res.header("X-Powered-By",' 3.2.1')
		// res.header("Content-Type", "application/json;charset=utf-8");
		next();
	});
    app.get('/getdata',function(req, res) {
	    db.getGoods('','',function(results){
	          res.send(results)
	          // console.log(results)
	    })
    }); 
    app.get('/getunit',function(req, res) {
	    db.getunit('','',function(results){
	          res.send(results)
	          // console.log(results)
	    })
    }); 
    // app.post('/add',urlencodedParser,function(req, res) {
    //     db.add(function(results){
	   //        res.send(results)
	   //        console.log(results)
	   //  })
    // }); 


    app.post('/addClassify',urlencodedParser,function(request,response){
    	
    	request.query.data = JSON.parse(request.query.data);
    	let inputData = request.query.data.classifyname;
    	console.log(inputData)
		// let newData = [request.query.data];
		let condition = 'INSERT INTO classify (classifyname) VALUES("'+inputData+'")'
		db.add(condition,function(result){
			console.log(result)
		})
    })
    app.post('/addUnit',urlencodedParser,function(request,response){
    	
    	request.query.data = JSON.parse(request.query.data);
    	let inputData = request.query.data.unitname;
    	console.log(inputData)
		// let newData = [request.query.data];
		let condition = 'INSERT INTO unit (unitname) VALUES("'+inputData+'")'
		db.add(condition,function(result){
			console.log(result)
		})
    })

    app.post('/delClassify',urlencodedParser,function(request,response){
    	
    	// request.query.data = JSON.parse(request.query.data);
    	// let inputData = request.query.data.classifyname;
    	console.log(request.query.data)
    	let delData = request.query.data;

		// let newData = [request.query.data];
		let condition = 'DELETE FROM classify WHERE classifyname="'+delData+'";'
		db.del(condition,function(result){
			console.log(result)
		})

    	
    })
    app.post('/delUnit',urlencodedParser,function(request,response){
    	
    	// request.query.data = JSON.parse(request.query.data);
    	// let inputData = request.query.data.unitname;
    	console.log(request.query.data)
    	let delData = request.query.data;

		// let newData = [request.query.data];
		let condition = 'DELETE FROM unit WHERE unitname="'+delData+'";'
		db.del(condition,function(result){
			console.log(result)
		})

    	
    })

    app.post('/changeClassify',urlencodedParser,function(request,response){
		request.query.data = JSON.parse(request.query.data);
		console.log(request.query.data,request.query.data.new)
		let delData = request.query.data;

		// let newData = [request.query.data];
		// UPDATE classify SET classifyname='药品' WHERE classifyname='玩具';
		let condition = 'UPDATE classify SET classifyname="'+delData.new+'"WHERE classifyname="'+delData.old+'";'
		db.del(condition,function(result){
			console.log(result)
		})

    	
    })

}