var express = require('express');
var router = express.Router();
var model = require('../model');

/* GET home page. */
router.get('/', function(req, res, next) {
  model.connect(function(db){
    db.collection('users').find().toArray(function(err,docs){
      console.log('acccounts list',docs)
      res.render('index', { title: 'Express' });
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

module.exports = router;
