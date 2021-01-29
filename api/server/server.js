const express = require ('express')
const bodyparser = require ('body-parser')
const api =  require('./routes/api')
const cors = require('cors')
const PORT = 3000


const app = express()
app.use (cors())
app.use(bodyparser.json())
app.use('/api',api)

app.get('/',function(req,res){

    res.send('hello yarram')

})

app.listen(PORT,function(){

    console.log("sever running"+PORT)
})