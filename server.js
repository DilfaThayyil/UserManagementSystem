const express = require("express")
const path = require('path') 
const app = express()
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')
const session=require('express-session')
const flash = require('express-flash')
const crypto = require('crypto')
const nocache = require("nocache");


app.use(nocache());
app.use(flash());
const port = process.env.PORT||3000
const mongoose = require("mongoose")


app.use(session({
  secret: crypto.randomBytes(64).toString('hex'),
  resave: false,
  saveUninitialized: true,

}))


mongoose.connect("mongodb://127.0.0.1:27017/user_management").then(()=>{
  console.log("connected");
}).catch(()=>{
  console.log("not connected");
})
-
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')


//load static assets
app.use('/static',express.static(path.join(__dirname,'public')))

 //home route
app.use('/',userRouter)
app.use('/admin',adminRouter)

app.listen(port,()=>{
  console.log("Listening to the server on http://localhost:3000")
})

