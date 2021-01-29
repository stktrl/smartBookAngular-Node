const express = require('express')
const jwt = require ('jsonwebtoken')
const router = express.Router()
const mongoose = require('mongoose')
//const user = require('../models/user')
const User = require('../models/user')
const Member = require('../models/member')
const Books =require ('../models/book')
const RentBook =require('../models/rental')
const moment =require('moment')
const db = "mongodb+srv://tgrl:tgrll@smartbooks.m7l1r.mongodb.net/SmartBooks?retryWrites=true&w=majority"
//mongoose.set('useFindAndModify', false);

/*Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}*/




mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify:false }, err => {
    if (err) {
        console.error(err)
    } else {
        console.log("connect")
        
    }
    
})
mongoose.Promise = global.Promise;
router.get('/', (req, res) => {

    res.send('from api')

})
router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('invalid email')
            } else if (user.password !== userData.password) {
                res.status(401).send('invalid password')
            } else {
                let payload = {subject: user._id }
                let token =jwt.sign(payload,'secretKey')
                res.status(200).send({token})
            }

        }

    })

})
router.post('/addBook',verifyToken,(req,res)=>{
    let bookData =req.body
    Books.insertMany(bookData,(err,result)=>{
        if(err){
            console.log(err+"bookupdate")
            res.send(err)
        }
        else{
            res.status(200).send(result)
        }
    })

})
router.post('/addmember',verifyToken,(req,res)=>{
    let memberData =req.body
    Member.insertMany(memberData,(err,result)=>{
        if(err){
            console.log(err+"bookupdate")
            res.send(err)
        }
        else{
            res.status(200).send(result)
        }
    })

})

router.get('/memberlist',verifyToken,(req,res)=>{
    console.log("sse")
    Member.find({}, function(err, result) {
        if (err) {
          console.log(err+"booklist");
        } else {
          res.json(result);
          console.log(result)
        }
      });

})
router.get('/booklist',verifyToken,(req, res) =>{

    ///burda kaldım 
   /* Books.find({}, function(err, _books) {
        var booksmap = {};
    
        _books.forEach(function(user) {
          booksmap[user._id] = user;
        });
    
        res.send(booksmap);  
      });*/
      Books.find({}, function(err, result) {
        if (err) {
          console.log(err+"booklist");
        } else {
          res.json(result);
          console.log(result)
        }
      });
})
router.post('/rentBook',(req,response) => {
    let rentData = req.body
    moment.locale('tr')

    var today = moment();
    var datex = moment(today).add(rentData.date, 'days');
    console.log(datex)
    //var tempDate= addDays(datex,rentData.date)
     rent={
        bookName: rentData.bookName,
        bookCategory: rentData.bookCategory,
        bookStock: rentData.bookStock,
        bookAuthor: rentData.bookAuthor,
        bookBarcode: rentData.bookBarcode,
        bookPublisherHouse: rentData.bookPublisherHouse, 
        
        memberName: "",
        memberEmail: "",
        memberPhone: "",
        memberTcNo: "",
        

        date : datex.format('LL')
    }  
    console.log(rent)
    const book = { 
        bookName: rentData.bookName,
        bookCategory: rentData.bookCategory,
        bookStock: rentData.bookStock,
        bookAuthor: rentData.bookAuthor,
        bookBarcode: rentData.bookBarcode,
        bookPublisherHouse: rentData.bookPublisherHouse
      }
      //sadece memeber tc ile sorgu atılıp gelen veriyle kayıt alınabilir
    const memberTcNoRent= rentData.memberTcNo
    let memberTemp={}
    Member.findOne({"memberTcNo":memberTcNoRent},(err,memberobj)=>{
        if(err){
            console.log(err)
        }else{
           rent.memberName=memberobj.memberName
           rent.memberEmail=memberobj.memberEmail
           rent.memberPhone=memberobj.memberPhone
           rent.memberTcNo=memberobj.memberTcNo
        console.log(rent)
        }

    })
      
    Books.findByIdAndDelete(req.body._id,(err,result)=>{

        if(err){
            console.log(err+"bookDelete")
            res.send(err)
        }
        else{
            
            const rentalbookx= new RentBook({
                bookName: rent.bookName,
                bookCategory: rent.bookCategory,
                bookStock: rent.bookStock,
                bookAuthor: rent.bookAuthor,
                bookBarcode: rent.bookBarcode,
                bookPublisherHouse: rent.bookPublisherHouse, 
                member:{
                memberName:  rent.memberName,
                memberEmail: rent.memberEmail,
                memberPhone: rent.memberPhone,
                memberTcNo: rent.memberTcNo,
                },
                date: rent.date,
                })
                rentalbookx.save((err, cust) => {
                    if (err) return console.error(err)
                
                    // This will print inserted record from database
                     console.log(cust);
                }) 
                    response.status(200).send(result);
        }
    })
    



})

router.get('/rentalbooklist',verifyToken,(req,res)=>{
    RentBook.find({}, function(err, result) {
        if (err) {
          console.log(err+"booklist");
        } else {
          res.json(result);
          console.log(result)
        }
      });

})
router.post('/bookUpdate',verifyToken,(req,res) => {
    let bookData = req.body
    console.log(bookData)
    const book = { 
        bookName: bookData.bookName,
        bookCategory: bookData.bookCategory,
        bookStock: bookData.bookStock,
        bookAuthor: bookData.bookAuthor,
        bookBarcode: bookData.bookBarcode,
        bookPublisherHouse: bookData.bookPublisherHouse
      }
    Books.findByIdAndUpdate(bookData._id,book,(err,result)=>{

        if(err){
            console.log(err+"bookupdate")
            res.send(err)
        }
        else{
            res.status(200).send(result)
            console.log(res.statusCode)
        }

    })
   


})
router.post('/memberupdate',verifyToken,(req,res) => {
    let memberData = req.body
    console.log(memberData)
    const membertemp = { 
        memberName: memberData.memberName,
        memberEmail: memberData.memberEmail,
        memberPhone: memberData.memberPhone,
        memberTcNo: memberData.memberTcNo,
      }
    Member.findByIdAndUpdate(memberData._id,membertemp,(err,result)=>{

        if(err){
            console.log(err+"bookupdate")
            res.send(err)
        }
        else{
            res.status(200).send(result)
            console.log(res.body)
        }

    })
   


})


router.post('/memberdelete',verifyToken,(req,res) => {

    let memberData = req.body
    console.log(memberData)
    const tempMember = { 
        memberName: memberData.memberName,
        memberEmail: memberData.memberEmail,
        memberPhone: memberData.memberPhone,
        memberTcNo: memberData.memberTcNo,
      }
    Member.findByIdAndDelete(memberData._id,tempMember,(err,result)=>{

        if(err){
            console.log(err+"bookDelete")
            res.send(err)
        }
        else{
            res.status(200).send(result)
            console.log(res.statusCode)
        }

    })

})
router.post('/rentdelete',verifyToken,(req,res) => {

    let memberData = req.body
    const book = { 
        bookName: memberData.bookName,
        bookCategory: memberData.bookCategory,
        bookStock: memberData.bookStock,
        bookAuthor: memberData.bookAuthor,
        bookBarcode: memberData.bookBarcode,
        bookPublisherHouse: memberData.bookPublisherHouse
      }
      Books.insertMany(book,(err,result)=>{
        if(err){
            console.log(err+"bookupdate")
            res.send(err)
        }
        
    })
   
    RentBook.findByIdAndDelete(memberData._id,(err,result)=>{

        if(err){
            console.log(err+"bookDelete")
            res.send(err)
        }
        else{
            res.status(200).send(result)
            console.log(res.statusCode)
        }

    })


})


router.post('/bookDelete',verifyToken,(req,res) => {

    let bookData = req.body
    console.log(bookData)
    const book = { 
        bookName: bookData.bookName,
        bookCategory: bookData.bookCategory,
        bookStock: bookData.bookStock,
        bookAuthor: bookData.bookAuthor,
        bookBarcode: bookData.bookBarcode,
        bookPublisherHouse: bookData.bookPublisherHouse
      }
    Books.findByIdAndDelete(bookData._id,(err,result)=>{

        if(err){
            console.log(err+"bookDelete")
            res.send(err)
        }
        else{
            res.status(200).send(result)
            console.log(res.body)

        }

    })

})
function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Onaylanmamış istek')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Onaylanmamış istek')
    }
    let payload = jwt.verify(token,'secretKey')
    if(!payload){
        return res.status(401).send('Onaylanmamış istek')
    }
    req.userId=payload.subject
    next()
}

router.get('/bookInformation/',verifyToken,(req,res) => {
    //var myId = JSON.parse(req.body);

    console.log(req.query._id)
   Books.findById(req.query._id,(err,book)=>{
        if(err){
            console.log(err)
        }
        res.send(book)
        console.log(book)
        
    })
    



})
router.get('/memberInformation/',verifyToken,(req,res) => {
    //var myId = JSON.parse(req.body);

    console.log(req.query._id+"*****member Info*****")
   Member.findById(req.query._id,(err,members)=>{
        if(err){
            console.log(err)
        }
        res.send(members)
        console.log(members)
        
    })
    



})


router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    User.findOne({ email: userData.email }, (error, isexist) => {
        if (isexist) {
            res.status(400).send('kayıtlı kullanıcı')
        } else {
            user.save((error, registeredUser) => {
                if (error) {
                    console.log(error)
                } else {
                    let payload = {subject: registeredUser._id }
                    let token =jwt.sign(payload,'secretKey')
                    res.status(200).send({token})
                    
                }

            })

        }

    })


})
module.exports = router