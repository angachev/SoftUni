const mongoose=require('mongoose')

let meme =new mongoose.Schema({
    memeName:{type:String,required:true},
    memePath:{type:String,required:true},
    memeTitle:[{type:String,required:true}],
    dateOfCreation:{type:Date,default:Date.now()}
})

module.exports=mongoose.model('Meme',meme)