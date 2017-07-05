var path = require('path');
var sql = require('../module/mysql-module');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

exports.Register = function(express){
    var app = express();

    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        if(req.method=="OPTIONS") {
            res.send(200);/*让options请求快速返回*/
        } else{
            next();
        }
    });

    app.post('/',urlencodedParser,function(request, response){
        response.end('669999966');
    })

    app.post('/getProducts',urlencodedParser,function(req,res){
            console.log('我进来这里了')
            var data = req.body;
            sql.exists('purchaseForm',function(callback){
                // console.log('purchaseForm',callback)
                if(callback.status){
                    res.send(callback);
                }else{

                }               
            })       
    })
    //获取单位
     app.post('/classify',urlencodedParser,function(req,res){
            console.log('我进来unit')
            var data = req.body;
            sql.exists('unit',function(callback){
                // console.log('qqq',callback)
                if(callback.status){
                    res.send(callback);
                }else{

                }               
           })       
    })
      //获取商品类型
     app.post('/goodstype',urlencodedParser,function(req,res){
            console.log('我进来unit')
            var data = req.body;
            sql.exists('goodstype',function(callback){
                // console.log('qqq',callback)
                if(callback.status){
                    res.send(callback);
                }else{

                }               
           })       
    })
    // 录数据入口
    app.post('/addProducts',urlencodedParser,function(req,res){
            console.log('我进来addProducts了');
            console.log( req.body,'======', req.query)
            var data = req.body;
            var arr = [data.proid,data.goodstitle,data.goodstype,data.goodsnum,data.goodsunit,data.buyprice,data.suppliername,data.totalprice];
           
            sql.add(arr,function(callback){
               sql.exists('purchaseForm',function(callback){
                        console.log('789')
                        res.send(callback);
               })             
            }) 

    })
     //删除数据入口
    app.post('/delProducts',urlencodedParser,function(req,res){
            console.log('del');
            // console.log( req.body,'======', req.query)
            var data = req.body.proid;
            // 
            sql.del(data,function(callback){

               sql.exists('purchaseForm',function(callback){
                        console.log('del')
                        res.send(callback);
               })             
            })       
    })

    //更新数据
     app.post('/changeProducts',urlencodedParser,function(req,res){
            console.log('changeProducts9999999');
            // console.log( req.body,'======', req.query)
            var data = req.body;
            console.log('data',data)
            var arr = [data.goodstitle,data.goodstype,data.goodsnum,data.goodsunit,data.buyprice,data.suppliername,data.totalprice,data.proid];

            sql.change(arr,function(callback){

               sql.exists('purchaseForm',function(callback){
                        // console.log('del')
                        res.send(callback);
               })             
            })       
    })




    app.use(express.static(path.join(path.resolve(__dirname, '../../'), '/')));

    app.listen(8888);

}