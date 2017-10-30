let express = require('express');
let router = express.Router();

const Genre = require('../models/GenreSchema');
const Meme = require('../models/MemeSchema');

/* GET addMeme listing. */
router.get('/', function(req, res, next) {
  Genre.find({}).then((genres) => {
    res.render('addMeme', {genres});
  })
}).post('/', function (req, res, next) {
   Meme.create(req.body)
      .then((meme) => {
        req.files.meme.mv(`./public/downloadedFiles/${meme._id + ''}.jpg`, (err) => {
          if(err){
            console.log(err);
          }

          Genre.findById(req.body.genreSelect, (err, genre) => {
            genre.memes.push(meme)        
            genre.save((err) => {
              if (err) {
                console.log(err)
                return
              }
              res.redirect('/viewAll')
            })
          })
        })
      }).catch(err => {
        console.log(err);
      })
})
  

module.exports = router;
