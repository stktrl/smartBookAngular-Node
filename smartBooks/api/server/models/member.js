const mongoose = require('mongoose')

const schema = mongoose.Schema
const memberSchema = new schema({
    memberName: String,
    memberEmail: String,
    memberPhone: String,
    memberTcNo: String,
})

module.exports = mongoose.model('member',memberSchema,'MemberInformation')