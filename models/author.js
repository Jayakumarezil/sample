const mongoose = require('mongoose')

const author = new mongoose.Schema({
   name : { type: String,
    required :true
   }
})



module.exports = mongoose.model('author',author)