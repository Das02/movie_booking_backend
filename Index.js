var express=require('express')
var app=express()
var port=9090
var hostname = 'localhost';
const cors = require('cors');
app.use(cors())
var sign=require('./routes/Signin')
var login = require('./routes/Login')
var movie=require('./routes/Movies')
var feedback=require('./routes/Feedback')
var booked = require('./routes/Booked')
app.get('/',(req,res)=>{
    res.send("welcome to BACKEND")
})
app.use('/signin',sign)
app.use('/login',login)
app.use('/movie',movie)
app.use('/feedback',feedback)
app.use('/booked',booked)

app.listen(port,hostname,()=>{
    console.log("server running on port"+port);
})
