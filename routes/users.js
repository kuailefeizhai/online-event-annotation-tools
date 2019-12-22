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


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//regist normal account 
router.post('/regist',function(req,res,next){
  var data = {
    username : req.body.username,
    password : req.body.password,
    password2 : req.body.password2,
    // document :{
    //   DocumentID: "",
    //   EventID: "",
    //   type: "",
    //   start: "",
    //   end: "",
    //   role: "",
    //   Btext: "",
    // }
  }
  model.connect(function(db){
    db.collection('users').insertOne(data,function(err,ret){
      if(err){
        console.log('regist failed!')
        res.redirect('/regist')
      }else{
        res.redirect('/login')
      }
    })
  })
  if(data.password!=data.password2){
    res.redirect('/regist')
    console.log("两次密码不一致")
  }else{
    console.log('regist successfully!')
    res.redirect('/login')
  }
})

//login 
router.post('/login',function(req,res,next){
  var data = {
    username : req.body.username,
    password : req.body.password,
  }
  model.connect(function(db){
    db.collection('users').find(data).toArray(function(err,docs){
      if(err){
        res.redirect('/login')
        console.log('database connection err')
      }else{
        if(docs.length > 0){
          // set session
          req.session.username = data.username
          res.redirect('/')
          console.log('login successfully!')
        }else{
          res.redirect('/login')
          console.log('this account dosent exsite')
        }
      }
    })
  })
})

//logout
router.get('/logout',function(req,res,next){
  req.session.username = null
  console.log(req.session.username)
  res.redirect('/login')
})

module.exports = router;
