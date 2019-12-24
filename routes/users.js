var express = require('express');
var router = express.Router();
var model = require('../model');
// var multiparty = require('multiparty');
var multer  = require('multer');
var fs = require('fs');
// var text = require('text');
// router.all('*', function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "X-Requested-With");
// 	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
// 	res.header("X-Powered-By",' 3.2.1')
// 	res.header("Content-Type", "application/json;charset=utf-8");
// 	next();
// });
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
    // res.redirect('/regist')
    // console.log("两次密码不一致")
    // model.connect(function(db){
    //   db.collection('users').deleteOne(data,function(err,ret){
    //     if(err){
    //       console.log('delete err')
    //     }else{
    //       console.log('delete successfully')
    //     }
    //   })
    // })
    res.status(200).json({ "code": "-1" ,"msg": "两次密码不一致"})
  }else{
    model.connect(function(db){
      db.collection('users').find({'usernam':'data.username'}).toArray(function(err,docs){
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
                  res.status(200).json({ "code": "1" ,"msg": "regist successfully"})
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
        // res.redirect('/login')
        console.log('database connection err')
        res.status(200).json({ "code": "-1" ,"msg": "database connection err"})
      }else{
        if(docs.length > 0){
          // set session
          req.session.username = data.username
          // res.redirect('/')
          console.log('login successfully!')
          res.status(200).json({ "code": "1" ,"msg": "login successfully"})
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
router.get('/logout',function(req,res,next){
  req.session.username = null
  console.log(req.session.username)
  // res.redirect('/login')
  res.status(200).json({ "code": "1" ,"msg": "logout successfully"})
})

//leader
// router.get('/leader',function(req,res,next){
  
// })

//upload
// router.post('/upload',function(req,res,next){
//   var form = new multiparty.Form();
//   form.parse(req,function(err,fields,files){
//     if(err){
//       console.log('upload failed!')
//     }else{
//       console.log(files)
//       var file = files[0]
//       var rs = fs.createReadStream(file.path)
//       var newPath = '/upload' + file.originalFilename
//       var ws = fs.createWriteStream('./public' + newPath)
//       rs.pipe(ws)
//       ws.on('close',function(){
//         console.log('upload successfully!')
//         res.send({err: '',msg:newPath})
//       })
//     }
//   })
// })
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
              res.end( JSON.stringify( response ) );
          }
      });
  });
  model.connect(function(db){
    db.collection('users').find({'username':req.session.username}).toArray(function(err,docs){
      if(err){
        res.redirect('/leader')
        console.log('database connection err')
      }else{
        console.log(docs[0])
        var groupID0 = docs[0].groupID
        var content0 = fs.readFileSync(des_file,'utf-8').toString();
        var document = {
          ID : 0,
          content : content0,
          BZID : 0,
          groupID : groupID0,
        }
        model.connect(function(db){
          db.collection('document').insertOne(document,function(err,ret){
            if(err){
              throw err;
            }else{
              console.log(document)
            }
          })
          db.collection('document').find().toArray(function(err,docs){
            console.log('document list',docs)
          })
        })
      }
    })
  })
});

//apply
router.get('/apply',function(req,res,next){
  model.connect(function(db){
    db.collection('users').updateOne({'username':req.session.username},{$set:{
      'identity':'true'
    }},function(err,ret){
      if(err){
        throw err
      }else{
        db.collection('users').find({'username':req.session.username}).toArray(function(err,docs){
          console.log(docs)
        })
      }
    })
  }) 
  res.redirect('/')
})

//join group
router.post('/join',function(req,res,next){
  var GroupID = parseInt(req.body.groupID)
  model.connect(function(db){
    db.collection('users').updateOne({'username':req.session.username},{$set:{
      'groupID':GroupID
    }},function(err,ret){
      if(err){
        throw err
      }else{
        db.collection('users').find({'username':req.session.username}).toArray(function(err,docs){
          console.log(docs)
        })
        res.redirect('/group/?id=' + GroupID)
      }
    })
  }) 
})


module.exports = router;
