const mongoose = require('mongoose')
let postSchema = new mongoose.Schema({
    title:{type:String,required:true},
    post:{type:String,required:true},
    category:{type:String},
    image:{type:String},
},
{timestamps:true},
{ collection : 'post',versionKey: false })
module.exports = mongoose.model('post',postSchema)