const fs = require('fs')
const path =require('path')
const url = require('url')

function getContentType(url){
    let support = {
        '.css': 'text/css',
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.ico': 'image/x-icon'
      }
    
      for (let type in support) {
        if (url.endsWith(type)) {
            console.log(support[type])
          return support[type]
        }
      }
      return true
}

module.exports=(req,res)=>{
    req.pathname=req.pathname||url.parse(req.url).pathname
    

    if(req.pathname.startsWith('/content/') && req.method==='GET'){
        let filePath=path.normalize(path.join(__dirname,`..${req.pathname}`))

        fs.readFile(filePath,(err,data)=>{
            if(err){
                res.writeHead(404, {
                    'Content-Type':'text/plain'
                })

                res.write('Resourse not found!')
                res.end()
                return
            }


            res.writeHead(200, {
                'Content-Type':getContentType(req.pathname)
            })
            res.write(data)
            res.end()
        })
    }else{
        return true
    }
}