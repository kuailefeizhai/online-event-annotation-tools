var express = require('express');
var router = express.Router();
var model = require('../model');

// router.all('*', function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "X-Requested-With");
// 	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
// 	res.header("X-Powered-By",' 3.2.1')
// 	res.header("Content-Type", "application/json;charset=utf-8");
// 	next();
// });
/* GET home page. */
router.get('/', function(req, res, next) {
  model.connect(function(db){
    db.collection('users').find().toArray(function(err,docs){
      // console.log('acccounts list',docs)
      res.render('index', {})
    })
  })

});

//渲染注册页面
router.get('/regist',function(req,res,next){
  res.render('regist',{})
})
//渲染登录页面
router.get('/login',function(req,res,next){
  res.render('login',{})
})
//leader page
router.get('/leader',function(req,res,next){
  res.render('leader',{})
})
//join page
router.get('/join',function(req,res,next){
  res.render('join',{})
})
//group page
router.get('/group', function(req, res, next) {
  var id = parseInt(req.query.id)
  // res.render('group', {id : id })
  model.connect(function(db){
    // db.collection('document').find().toArray(function(err,docs){
    //   console.log('document list',docs)
    // })
    var content = []
    db.collection('document').find({'groupID':id}).toArray(function(err,docs){
      docs.forEach(function(v,i,a){
        content[i] = v.content
      })
      console.log(content)
      res.render('group', {id : id , content : content})
    })
  })
});

module.exports = router;
