module.exports = {
    MongoURI: 'mongodb://localhost:27017/passport'
}
/*
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/passport')
const db =  mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log('Connected to Mongodb')
    app.listen(app.get('port'), function () {
        console.log('API Server listening on port '+ app.get('port') + '!')
    })
})*/