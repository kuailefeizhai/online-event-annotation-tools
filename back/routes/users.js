var express = require('express');
var router = express.Router();
var model = require('../model');
// var multiparty = require('multiparty');
var multer  = require('multer');
var fs = require('fs');
// var text = require('text');
router.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});
var upload = multer({dest: '/public/upload/'});

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
    identity : '否',//normal = false ,leader = true
    groupID : 0,
    request : false,
  }

  if(data.password!=data.password2){
    res.status(200).json({ "code": "-1" ,"msg": "两次密码不一致"})
  }else{
    model.connect(function(db){
      db.collection('users').find({'username':data.username}).toArray(function(err,docs){
        if(err){
          // res.redirect('/regist')
          // console.log('database connection err')
          res.status(200).json({ "code": "-1" ,"msg": "database connection err"})
        }else{
          if(docs.length > 0){
            console.log('username exists!')
            // res.redirect('/regist')
            res.status(200).json({ "code": "-1" ,"msg": "username exists!"})
          }else{
            model.connect(function(db){
              db.collection('users').insertOne(data,function(err,ret){
                if(err){
                  // console.log('regist failed!')
                  // res.redirect('/regist')
                  res.status(200).json({ "code": "-1" ,"msg": "database connection err"})
                }else{
                  // res.redirect('/login')
                  res.status(200).json({ "code": "1" ,"msg": "regist successfully",userdata : data})
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
    db.collection('users').find({'username':data.username}).toArray(function(err,docs){
      if(err){
        // res.redirect('/login')
        console.log('database connection err')
        res.status(200).json({ "code": "-1" ,"msg": "database connection err"})
      }else{
        if(docs.length > 0){
          if(data.password == docs[0].password){
          // set session
          req.session.username = data.username
          // res.redirect('/')
          console.log('login successfully!')
          res.status(200).json({ "code": "1" ,"msg": "login successfully" , userdata : docs[0]})
          }else{
            res.status(200).json({"code": "-1" ,"msg": "password err"})
          }
        }else{
          // res.redirect('/login')
          res.status(200).json({ "code": "-1" ,"msg": "this account dosent exsit"})
          console.log('this account dosent exsit')
        }
      }
    })
  })
})

//logout
// router.get('/logout',function(req,res,next){
//   req.session.username = null
//   console.log(req.session.username)
//   // res.redirect('/login')
//   res.status(200).json({ "code": "1" ,"msg": "logout successfully"})
// })




//upload
router.post('/upload', upload.any(), function(req, res, next) {
  console.log(req.files[0]);  // 上传的文件信息
  var des_file = "./public/upload/" + req.files[0].originalname;
  fs.readFile( req.files[0].path, function (err, data) {
      fs.writeFile(des_file, data, function (err) {
          if( err ){
              console.log( err );
          }else{
              response = {
                  message:'File uploaded successfully',
                  filename:req.files[0].originalname
              };
              console.log( response );
              // res.end( JSON.stringify( response ) );
          }
      });
  });
  var username = req.body.username
  console.log(username)
  model.connect(function(db){
    db.collection('users').find({'username':username}).toArray(function(err,docs){
      if(err){
        // res.redirect('/leader')
        console.log('database connection err')
        res.status(200).json({ "code": "-1" ,"msg": "database connection err"})
      }else{
        model.connect(function(db){
          db.collection('document').find().toArray(function(err,id){
            var id0 = id.length + 1
            console.log(docs[0])
            var groupID0 = docs[0].groupID
            var content0 = fs.readFileSync(des_file,'utf-8').toString();
            var document = {
              ID : id0,
              content : content0,
              groupID : groupID0,
              filename : req.files[0].originalname
            }
            model.connect(function(db){
              db.collection('document').insertOne(document,function(err,ret){
                if(err){
                  throw err;
                }else{
                  console.log(document)
                  res.status(200).json({ "code": "1" ,"msg": "upload successfully",DocumentData : document})
                }
              })
            })
          })
        })
      }
    })
  })
});

//apply
router.post('/apply',function(req,res,next){
  model.connect(function(db){
    // db.collection('users').updateOne({'username':req.session.username},{$set:{
    db.collection('users').updateOne({'username':req.body.username},{$set:{
      'request':true
    }},function(err,ret){
      if(err){
        throw err
      }else{
        // db.collection('users').find({'username':req.session.username}).toArray(function(err,docs){
        //   console.log(docs)
        // })
        res.status(200).json({ "code": "1" ,"msg": "apply successfully"})
      }
    })
  }) 
  // res.redirect('/')
})


//join group
router.post('/join',function(req,res,next){
  var GroupID = parseInt(req.body.groupID)
  model.connect(function(db){
    db.collection('users').find({'identity':'是'}).toArray(function(err,docs){
      if(GroupID<docs.length + 1){
        console.log(GroupID)
        var username = req.body.username
        model.connect(function(db){
          db.collection('users').updateOne({'username':username},{$set:{
            'groupID':GroupID
          }},function(err,ret){
            if(err){
              throw err
            }else{
              res.status(200).json({ "code": "1" ,"msg": "join successfully",groupID : GroupID})
            }
          })
        }) 
      }else{
        res.status(200).json({ "code": "-1" ,"msg": "不存在该小组"})
      }
    })
  })
})
////
//admin
router.post('/admin',function(req,res,next){
  var username = req.body.username
  var password = req.body.password
  if(username == "root"){
    model.connect(function(db){
      db.collection('users').find({'username':'root'}).toArray(function(err,docs){
        if(err){
          throw err
        }else{
          if(password == docs[0].password){
            res.status(200).json({ "code": "1" ,"msg": "password correct!"})
          }else{
            res.status(200).json({ "code": "-1" ,"msg": "password error!"})
          }
          
        }
      })
    })
  }else{
    res.status(200).json({ "code": "-1" ,"msg": "username error!"})
  }
  
})

//AccountMessage
router.post('/AccountMessage',function(req,res,next){
  var AccountMessage = []
  model.connect(function(db){
    // db.collection('users').find({'request':true}).toArray(function(err,docs){
    db.collection('users').find().toArray(function(err,docs){
      if(err){
        throw err
      }else{
        for(let i = 0; i <docs.length; i++){
          AccountMessage[i] = {
            username : docs[i].username,
            password : docs[i].password,
            groupID : docs[i].groupID,
            identity : docs[i].identity,
          }
        }
        // docs.forEach(function(v,i,a){
        //   AccountMessage[i][username] = v.username
        // })
        res.status(200).json({ "code": "1" ,"msg": "account message" , AccountMessage : AccountMessage})
        // res.status(200).json({ "code": "1" ,"msg": "account message" , AccountMessage : docs})
      }
    })
  })
})

//leaderApply
router.post('/leaderApply',function(req,res,next){
  var leader = []
  model.connect(function(db){
    db.collection('users').find({'request':true}).toArray(function(err,docs){
      if(err){
        throw err
      }else{
        for(let i = 0; i <docs.length; i++){
          leader[i] = {
            username : docs[i].username
        }
      }
        res.status(200).json({ "code": "1" ,"msg": "leader apply" , leader : leader})
      }
    })
  })
})

//approve apply
router.post('/approveApply',function(req,res,next){
  var username = req.body.username
  model.connect(function(db){
    db.collection('users').find({'identity':'是'}).toArray(function(err,docs){
      var newID = docs.length + 1
      model.connect(function(db){
        db.collection('users').updateOne({'username':username},{$set:{
          'identity':'是',
          'groupID':newID,
          'request': false
        }},function(err,ret){
          if(err){
            throw err
          }else{
            res.status(200).json({ "code": "1" ,"msg": "approve apply"})
          }
        })
      })
    })
  })
})

//disapprove apply
router.post('/disapproveApply',function(req,res,next){
  let username = req.body.username
  model.connect(function(db){
    db.collection('users').updateOne({'username':username},{$set:{
      'request':false
    }},function(err,ret){
      if(err){
        throw err
      }else{
        res.status(200).json({ "code": "1" ,"msg": "disapprove apply"})
      }
    })
  })
})

module.exports = router;