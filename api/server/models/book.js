const mongoose = require('mongoose')

const schema = mongoose.Schema
const booksSchema = new schema({
    
    bookName: String,
    bookCategory: String,
    bookStock: String,
    bookAuthor: String,
    bookBarcode: String,
    bookPublisherHouse: String,
})

module.exports = mongoose.model('Books',booksSchema,'Books')