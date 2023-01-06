const mongoose = require('mongoose')
let userSchema = new mongoose.Schema({
    name:{type:String,required:true, unique:true},
    email:{type:String,required:true, unique:true},
    password:{type:String,required:true, unique:true},
},
{timestamps:true},
{ collection : 'users',versionKey: false })
module.exports = mongoose.model('users',userSchema)