var MongoClient =require('mongodb' ).MongoClient
const express = require('express')
const Sign =express.Router()
var asset = require('assert');
var url="mongodb://localhost:27017/"
const bodyParser = require('body-parser');
var dbname = "cinema";
var collections = 'signin';
Sign.use(bodyParser.json())

Sign.route('/').post((req,res)=>{
    console.log("hello", req.body);
    MongoClient.connect(url,(err,client)=>{
        asset.equal(err, null);
        var db = client.db(dbname);
        var collection = db.collection(collections);
        var doc=req.body;
        console.log(doc);
        collection.insertOne(doc,(err,result)=>{
            console.log(result)
            res.json(result)
        })
    })
})
module.exports = Sign;
