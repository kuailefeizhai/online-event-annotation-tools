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

//show all files
router.post('/fileList',function(req,res,next){
    var username = req.body.username
    model.connect(function(db){
        db.collection('users').find({'username':username}).toArray(function(err,doc){
           if(err){
               throw err
           }else{
            var groupID = doc[0].groupID
            model.connect(function(db){
                db.collection('document').find({'groupID':groupID}).toArray(function(err,docs){
                    if(err){
                        throw err
                    }else{
                    var files = []
                    for(let i = 0; i <docs.length; i++){
                        files[i] = {
                            filename : docs[i].filename,
                            DocumentID : docs[i].id,
                        }
                    }
                    res.status(200).json({"code": "1" ,"msg": "show files" ,files: files})
                    }
                })
            })
           }
        })
    })
})

//flie content
router.post('/fileContent',function(req,res,next){
    var DocumentID = req.body.DocumentID
    model.connect(function(db){
        db.collection('document').find({'ID':DocumentID}).toArray(function(err,doc){
            if(err){
                throw err
            }else{
                var file = {
                    content : doc[0].content,
                    filename : doc[0].filename,
                }
                res.status(200).json({"code": "1" ,"msg": "file content" ,file: file})
            }
        })
    })
})

//savelabel
router.post('/savelabel',function(req,res,next){
    var DocumentID = req.body.DocumentID
    var username = req.body.username
    model.connect(function(db){
        db.collection('label').find({'DocumentID':DocumentID}).toArray(function(err,docs){
            if(err){
                throw err
            }else{
                var EventID = docs.length + 1
                model.connect(function(db){
                    db.collection('label').find({'username':username,'DocumentID':DocumentID}).toArray(function(err,doc){
                        if(err){
                            throw err
                        }else{
                            if(doc.length == 0){
                                var labelContent = {
                                    DocumentID: DocumentID,
                                    EventID: EventID,
                                    type: req.body.type,
                                    start: req.body.start,
                                    end: req.body.end,
                                    role: req.body.role,
                                    trigger: req.body.trigger,
                                    username : username,
                                }   
                                model.connect(function(db){
                                    db.collection('label').insertOne(labelContent,function(err,ret){
                                        if(err){
                                            throw err
                                        }else{
                                            res.status(200).json({ "code": "1" ,"msg": "保存成功", labelContent : labelContent})
                                        }
                                    })
                                })
                            }else{
                                model.connect(function(db){
                                    db.collection('label').updateOne({'username':username},{$set:{
                                        'type': req.body.type,
                                        'start': req.body.start,
                                        'end': req.body.end,
                                        'role': req.body.role,
                                        'trigger': req.body.trigger,
                                    }},function(err,ret){
                                        if(err){
                                            throw err;
                                        }else{
                                            res.status(200).json({ "code": "1" ,"msg": "修改成功"})
                                        }
                                    })
                                })
                            }
                        }
                    })
                })
            }
        })
    })
})

//deleteLabel
router.post('/deleteLabel',function(req,res,next){
    var DocumentID = req.body.DocumentID
    var username = req.body.username
    model.connect(function(db){
        db.collection('label').deleteOne({'username':username,'DocumentID':DocumentID},function(err,ret){
            if(err){
                throw err
            }else{
                res.status(200).json({ "code": "1" ,"msg": "删除成功"})
            }
        })
    })
})

module.exports = router;