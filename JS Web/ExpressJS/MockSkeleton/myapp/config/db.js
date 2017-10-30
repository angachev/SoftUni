const mongoose = require('mongoose')
const path = 'mongodb://localhost/myapp'

mongoose.Promise = global.Promise



module.exports = (() => {
    mongoose.connect(path, {
        useMongoClient: true
    })
    console.log('DB is on')

})()