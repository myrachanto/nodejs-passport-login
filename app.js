const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')


const app = express()
//passport
require('./config/passport')(passport)
//db config
const db = require('./config/db').MongoURI
//connect to mongo
mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log('Mongo db connected...'))
.catch(err => console.log(err))
//ejs
app.use(expressLayouts)
app.set('view engine', 'ejs')

//body parse
app.use(express.urlencoded({extended: false}))
//Express session
app.use(session({
    secret: 'myrachanto',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true}
}))
//passport middleware
app.use(passport.initialize())
app.use(passport.session())
//connect flash
app.use(flash())
//gloabal vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

//set static folder
app.use(express.static(path.join(__dirname, 'public')))
//Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))



const PORT = process.env.PORT || 2000

app.listen(PORT, console.log(`Server started at port ${PORT}`))