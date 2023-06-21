const mongoose = require('mongoose')

const TeacherSchema = new mongoose.Schema({
    name:{
        type:String,
        Required:true
    },
    email:{
        type:String,
        Required:true
    },
    address:{
        type:String,
        Required:true
    }
})

const TeacherModel = mongoose.model('teach',TeacherSchema)

module.exports=TeacherModel