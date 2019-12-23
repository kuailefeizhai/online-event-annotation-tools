var express = require('express');
var router = express.Router();
var model = require('../model');
var multiparty = require('multiparty');

// router.all('*', function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "X-Requested-With");
// 	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
// 	res.header("X-Powered-By",' 3.2.1')
// 	res.header("Content-Type", "application/json;charset=utf-8");
// 	next();
// });


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
    identity : false,//normal = false ,leader = true
    groupID : 0,
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

  if(data.password!=data.password2){
    res.redirect('/regist')
    console.log("两次密码不一致")
    // model.connect(function(db){
    //   db.collection('users').deleteOne(data,function(err,ret){
    //     if(err){
    //       console.log('delete err')
    //     }else{
    //       console.log('delete successfully')
    //     }
    //   })
    // })
  }else{
    // console.log('regist successfully!')
    // res.redirect('/login')
    model.connect(function(db){
      db.collection('users').find(data.username).toArray(function(err,docs){
        if(err){
          res.redirect('/regist')
          console.log('database connection err')
        }else{//前端表达
          if(docs.length > 0){
            console.log('username exists!')
            res.redirect('/regist')
          }else{
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
          }
        }
      })
    }) 
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
          console.log('this account dosent exsit')
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

//leader
// router.get('/leader',function(req,res,next){
  
// })

//upload
router.post('/upload',function(req,res,next){
  var form = new multiparty.Form();
  form.parse(req,function(err,fields,files){
    if(err){
      console.log('upload failed!')
    }else{
      console.log(files)
    }
  })
})
module.exports = router;
