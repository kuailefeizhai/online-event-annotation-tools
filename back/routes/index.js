var express = require('express');
var router = express.Router();
var model = require('../model');

router.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});
/* GET home page. */
router.get('/', function(req, res, next) {
  model.connect(function(db){
    db.collection('users').find().toArray(function(err,docs){
      // console.log('acccounts list',docs)
      // res.render('index', {})
      res.status(200).json({ data:docs})
    })
  })

});

// //渲染注册页面
// router.get('/regist',function(req,res,next){
//   res.render('regist',{})
// })
// //渲染登录页面
// router.get('/login',function(req,res,next){
//   res.render('login',{})
// })
// //leader page
// router.get('/leader',function(req,res,next){
//   res.render('leader',{})
// })
module.exports = router;
