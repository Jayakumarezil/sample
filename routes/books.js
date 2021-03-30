const express = require("express")
const router = express.Router()
const Book = require("../models/book")
const author  = require("../models/author")
const multer = require('multer')
const path = require("path")
const fs = require('fs')
const imagePath = path.join('public',Book.coverImagepath)
const imageMimeTypes = ['images/jpeg','images/png','images/gif']
const coverimage = multer({
    dest: imagePath,
    fileFilter: (req,file,callback)=>{
callback(null,imageMimeTypes)
    }
})




router.get("/",async (req,res)=>{
let query = Book.find()
if(req.query.title != null && req.query.title !=''){
    query = query.regex('title',new RegExp(req.query.title,'i'))
}
if(req.query.publishedBefore != null && req.query.publishedBefore !=''){
    query = query.lte('publishDate',req.query.publishedBefore)
}
if(req.query.publishedAfter != null && req.query.publishedAfter !=''){
    query = query.gte('publishDate',req.query.publishedAfter)
}
    try{
        const books =  await query.exec()
        res.render("books/index",{
            books : books,
            searchstring : req.query
        })
    } catch(err){
res.redirect('/')
    }


})

router.get("/new",async (req,res)=>{
    renderNewPage(res,new Book())
    
})

router.post("/",coverimage.single('cover'),async (req,res)=>{
  const fileName =  req.file ? req.file.filename : null
const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate : new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    description : req.body.description,
    coverImageName :fileName

})
try{
    const newBook =  await book.save()
console.log("savedd---")
    res.redirect('books')
} catch(err){
    console.log("errr---",err)
    if(book.coverImageName != null){
        removeImageCover(book.coverImageName)
    }

    renderNewPage(res, book , true)
}

})
function removeImageCover(filename){
fs.unlink(path.join(imagePath,filename),err =>{
    if(err) console.error(err)
})
}
async function renderNewPage (res,book,hasError = false){
    try{

        const Authors = await author.find({})
   const params ={
    authors : Authors,
    book :book
}
if(hasError) params.errorMessage = 'Error creating book'
        res.render("books/new",params)
    }
    catch(err){
    res.redirect("books")
    }
}

module.exports = router