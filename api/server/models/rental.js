const mongoose = require('mongoose')


const schema = mongoose.Schema
const rentalSchema = new schema({
    
    bookName: String,
    bookCategory: String,
    bookStock: String,
    bookAuthor: String,
    bookBarcode: String,
    bookPublisherHouse: String,
    member:{
    memberName: String,
    memberEmail: String,
    memberPhone: String,
    memberTcNo: String,
    },
    date: String,
})

module.exports = mongoose.model('Rental',rentalSchema,'Rental')