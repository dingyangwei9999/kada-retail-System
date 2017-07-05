var db = require('../module/purchas.module.js');

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

exports.Register = function(app){
    app.post('/getProducts',urlencodedParser,function(req,res){
            
            var data = req.body;
            db.exists('purchaseform',function(callback){
                // console.log('purchaseForm',callback)
                if(callback.status){
                    res.send(callback);
                }else{

                }               
            })       
    })
    //获取单位
     app.post('/classify',urlencodedParser,function(req,res){
            
            var data = req.body;
            db.exists('unit',function(callback){
                // console.log('qqq',callback)
                if(callback.status){
                    res.send(callback);
                }else{

                }               
           })       
    })
      //获取商品类型
     app.post('/goodstype',urlencodedParser,function(req,res){
            
            var data = req.body;
            db.exists('classify',function(callback){
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

            var data = req.body;
            var arr = [data.proid,data.goodstitle,data.goodstype,data.goodsnum,data.goodsunit,data.buyprice,data.suppliername,data.totalprice];
           
        
            db.add(arr,function(callback){
                console.log(callback)
               db.exists('purchaseform',function(callback){
                     
                        res.send(callback);
               })             
            }) 

    })
     //删除数据入口
    app.post('/delProducts',urlencodedParser,function(req,res){
            console.log('del');
            // console.log( req.body,'======', req.query)
            var data = req.body.proid;
            console.log(data)
            // 
            db.del(data,function(callback){

               db.exists('purchaseform',function(callback){
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

            db.change(arr,function(callback){

               db.exists('purchaseform',function(callback){
                        // console.log('del')
                        res.send(callback);
               })             
            })       
    })
}