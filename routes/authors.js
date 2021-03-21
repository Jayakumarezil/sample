const express = require('express')
const router = express.Router()
const author = require("../models/author")

router.get('/', async (req,res)=>{
let searchstring = {}
if(req.query.name != null && req.query.name !== ''){
    searchstring.name = new RegExp (req.query.name , 'i')
} 

    try{
const authors=  await author.find(searchstring)
res.render('authors/index',{authors : authors, searchstring : req.query})
    }catch(err){
        res.redirect('/')
    }
    
})

router.get('/new',(req,res)=>{
    res.render('authors/new',{author : new author()})
})

router.post('/', async (req,res)=>{
const authorouter = new author({
    name:req.body.name
})
try{
    const newAuthor = await authorouter.save()
    res.redirect('authors')
}
catch(err){
    res.render('authors/new',{
        author :authorouter,
        errorMessage :'Error creating Author'
    })
}


    
})

module.exports = router