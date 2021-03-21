
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').load
}

const express = require("express")
const app = express()
const expresslayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const router = require('./routes/index')
const authorRouter = require('./routes/authors')



app.set("view engine",'ejs')
app.set("views" + __dirname+'/view') 
app.set("layout", 'layouts/layout')
app.use(expresslayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ linit : '10mb' , extented :false }))
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/sample',{useNewUrlParser:true})

const db = mongoose.connection
db.on("error", err=> console.error(err))
db.on("open", ()=> console.log("connectedd---"))

app.use('/',router)
app.use('/authors',authorRouter)
app.listen(process.env.PORT || 3000)
