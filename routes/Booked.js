var MongoClient = require('mongodb').MongoClient
var nodemailer = require('nodemailer')
const express = require('express')
const booked = express.Router()
var asset = require('assert');
var url = "mongodb://localhost:27017/"
const bodyParser = require('body-parser');
var dbname = "cinema";
var collections = 'booked_tickets';
booked.use(bodyParser.json())

booked.route('/').post((req, res) => {
    console.log("hello", req.body.user_email);
    const email = req.body.user_email
    const date = req.body.Booked_date
    const time = req.body.Booked_time
    const person = req.body.Total_person
    const movie = req.body.Booked_movie
    MongoClient.connect(url, (err, client) => {
        asset.equal(err, null);
        var db = client.db(dbname);
        var collection = db.collection(collections);
        var doc = req.body;
        console.log(doc);
        collection.insertOne(doc, (err, result) => {
            console.log(result)
            res.json(result)
            var transporter = nodemailer.createTransport({
                service: 'outlook',
                auth: {
                    user: "das25kkdi@outlook.com",
                    pass: "daspraveen25"
                }
            })
            var mailoption = {
                from: 'das25kkdi@outlook.com',
                to: email,
                subject: "Booking confirm for" + " " + movie,
                text: "Your booking for" + " " + movie + " " + "has been confirm on" + " " + date + " " + "and the time is" + time + " " + "for" + " " + person + " " + "persons"
            }

            transporter.sendMail(mailoption, (err, info) => {
                if (err) {
                    console.log("error" + " " + err);
                }
                else {
                    console.log("message sended" + info);
                }
            })
        })
    })
})
module.exports = booked;
