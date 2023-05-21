var MongoClient=require('mongodb').MongoClient
const express = require('express')
const Login =express.Router()
var asset = require('assert');
var url="mongodb://localhost:27017"
const bodyParser = require('body-parser');
var dbname = 'cinema';
var collections = 'signin';
Login.use(bodyParser.json())


Login.route('/').post((req,res)=>{
    MongoClient.connect(url,(err,client)=>{
        asset.equal(err, null);
        var db = client.db(dbname);
        var collection = db.collection(collections);
        var doc=req.body
        console.log(doc);
        collection.find(doc).toArray((err,result)=>{
            res.json({result:result})
            console.log({result:result})
        })
    })
})
module.exports = Login;
