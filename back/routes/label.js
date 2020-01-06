var express = require('express');
var router = express.Router();
var model = require('../model');
var xml = require('xml');

router.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

//show all files
router.get('/fileList',function(req,res,next){
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
    var argument = []
    for(let i = 0; i <req.body.argument.length; i++){
        argument[i] = {
            start: req.body.argument[i].start,
            end: req.body.argument[i].end,
            role: req.body.argument[i].role,
        }
    }
    console.log(argument)
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
                                    trigger: {
                                        start: req.body.trigger.start,
                                        end: req.body.trigger.end,
                                    },
                                    argument: argument,
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
                                        'trigger': {
                                            start: req.body.trigger.start,
                                            end: req.body.trigger.end,
                                        },
                                        'argument':argument,
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

//export
router.post('/export',function(req,res,next){
    // var example3 = [ { toys: [ { toy: 'Transformers' } , { toy: 'GI Joe' }, { toy: 'He-man' } ] } ];
    // var test = '123'
    // var example4 = [ { toys: [ { _attr: { decade: '80s', locale: 'US'}}, test,{ toy: 'Transformers' } , { toy: 'GI Joe' }, { toy: 'He-man' } ] } ];
    // console.log(xml(example4,true));
    var DocumentID = req.body.DocumentID
    var username = req.body.username
    model.connect(function(db){
        db.collection('label').find({'username':username,'DocumentID':DocumentID}).toArray(function(err,docs){
            if(err){
                throw err
            }else{
                var des_file = "./public/download/" + docs[0].username +"_" + docs[0].DocumentID + ".xml";
                var label = docs[0]
                model.connect(function(db){
                    db.collection('document').find({'ID':DocumentID}).toArray(function(err,doc){
                        var trigger = []
                        for(let i = label.trigger.start; i<label.trigger.end; i++){
                            trigger[i] = doc[0].content[i]
                        }
                        var event_argument = []
                        for(let i = 0; i<label.argument.length; i++){
                            let content = []
                            for(let j = label.argument[i].start; j<label.argument[i].end; i++){
                                content[j] = doc[0].content[j]
                            }
                            event_argument[i] = {
                                _attr : {
                                    START: label.argument[i].start,
                                    END: label.argument[i].end,
                                    ROLE: label.argument[i].role,
                                },
                                content,
                            }
                        }
                        data = [
                            {
                                Document: [
                                    {_attr: { ID: label.DocumentID}},
                                    {event: [
                                        {_attr: {ID: label.EventID, TYPE: label.type}},
                                        {event_trigger: [
                                            {_attr: {START: label.trigger.start, END: label.trigger.end}},
                                            trigger,
                                        ]},
                                        event_argument,
                                    ]}
                                ]
                            },
                        ]
                        var xmldata = xml(data,true)
                        fs.writeFile(des_file, xmldata, function (err) {
                            if( err ){
                                console.log( err );
                            }else{
                                res.status(200).json({ "code": "1" ,"msg": "导出成功", filename: des_file})
                            }
                        });
                    })
                })
            }
        })
    })
})

module.exports = router;