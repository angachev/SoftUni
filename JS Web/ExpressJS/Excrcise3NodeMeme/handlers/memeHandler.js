const fs = require('fs')
const db = require('./../config/dataBase')
const qs = require('querystring')
const url = require('url')
const formidable = require('formidable')
const shortid = require('shortid')

const viewAllPath = './views/viewAll.html'
const viewAddPath = './views/addMeme.html'
const viewDetails = './views/details.html'

// Utils 
let memeGenerator = (id, title, memeSrc, description, privacy) => {
  return {
    id: id,
    title: title,
    memeSrc: memeSrc,
    description: description,
    privacy: privacy
  }
}

let defaultResponse = (res, data) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  res.write(data);
  res.end();
}


let viewAll = (req, res) => {
  let memes = db.getDb()

  memes = memes.sort((a, b) => {
    return b.dateStamp - a.dateStamp;
  }).filter((currentMeme) => {
    return currentMeme.privacy === 'on'
  })

  fs.readFile(viewAllPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    let memeSrting = '';
    for (let meme of memes) {
      memeSrting += `<div class="meme">
      <a href="/getDetails?id=${meme.id}">
      <img class="memePoster" src="${meme.memeSrc}"/>          
      </div>`

    }
    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', memeSrting)

    defaultResponse(res, data)

  })
}

let viewAddMeme = (req, res) => {



  fs.readFile(viewAddPath, (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    defaultResponse(res, data)

  })
}


let addMemes = (req, res) => {
  let form = new formidable.IncomingForm()
  let dbLength = Math.ceil(db.getDb().length / 10)
  let fileName = shortid.generate()
  let memePath = `./public/memeStorage/${dbLength}/${fileName}.jpg`


  form.on('error', (err) => {
    console.log(err)
    return
  }).on('fileBegin', (name, file) => {


    fs.access(`./public/memeStorage/${dbLength}`, err => {
      if (err) {
        fs.mkdirSync(`./public/memeStorage/${dbLength}`)
      }
    })

    file.path = memePath
  })

  form.parse(req, function (err, fields, files) {
    let id = shortid.generate()
    let createdMeme = memeGenerator(
      id,
      fields.memeTitle,
      memePath,
      fields.memeDescription,
      fields.status
    )

    db.add(createdMeme)
    db.save().then(() => {
      viewAddMeme(req, res)
    })
  })
}


let getDetails = (req, res) => {


  fs.readFile(viewDetails, (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    let targetedMemeId = qs.parse(url.parse(req.url).query).id
    let targetedMeme = db.getDb().find((searched) => {
      return searched.id === targetedMemeId
    })

    let replace = `<div class="content">
      <img src="${targetedMeme.memeSrc}" alt=""/>
      <h3>Title  ${targetedMeme.title}</h3>
      <p> ${targetedMeme.description}</p>
      <button><a href="${targetedMeme.posterSrc}" download="${targetedMeme.id}.jpg">Download Meme</a></button>
      </div>`

    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', replace)

    defaultResponse(res, data)
  })
}

module.exports = (req, res) => {
  if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
    viewAll(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'GET') {
    viewAddMeme(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'POST') {
    addMemes(req, res)
  } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
    getDetails(req, res)
  } else {
    return true
  }
}
