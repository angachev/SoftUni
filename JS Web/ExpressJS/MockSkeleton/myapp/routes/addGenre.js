const express = require('express')
const router = express.Router()

const Genre =require('./../models/GenreSchema')

router.get('/',function(req,res,next){

    res.render('addGenre')
})
router.post('/',function (req,res,next){

    let objParams=req.body
    console.log(objParams)
    Genre.create(objParams).then((obj)=>{
        console.log(objParams)

        res.render('addGenre', {status:true})
    })
})


module.exports=router