
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').load
}

const express = require("express")
const app = express()
const expresslayouts = require('express-ejs-layouts')
const router = require('./routes/index')


app.set("view engine",'ejs')
app.set("views" + __dirname+'/view') 
app.set("layout", 'layouts/layout')
app.use(expresslayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/sample',{useNewUrlParser:true})

const db = mongoose.connection
db.on("error", err=> console.error(err))
db.on("open", ()=> console.log("connectedd---"))

app.use('/',router)
app.listen(process.env.PORT || 3000)
