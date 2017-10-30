var express = require('express');
var router = express.Router();
const Genre =require('./../models/GenreSchema');

/* GET search  listing. */
router.get('/', function(req, res, next) {
  let tags=[];
  Genre.find({}).then(foundGenres=>{
    
    for(let genre of foundGenres){
      tags.push(genre)
    }

  res.render('search',{tags});
  })
});

module.exports = router;
