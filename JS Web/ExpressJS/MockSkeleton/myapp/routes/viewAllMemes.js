var express = require('express');
var router = express.Router();
const Meme = require('./../models/MemeSchema.js')

/* GET viewAll page. */
router.get('/', function(req, res, next) {
  Meme.find({}).then((memes)=>{

    res.render('viewAll',{memes});
  }).catch(err=>{
    console.log(err)
    return
  })
});

module.exports = router;
