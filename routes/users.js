const express = require ('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const passport = require('passport')
//routes
router.get('/login', (req, res) => res.render('login'))

//register

router.get('/register', (req, res) => res.render('register'))

//resgister handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body
    let errors = []
    //check if empty
    if(!name || !email || !password || !password2){
        errors.push({ msg: 'Please filled in all the fields'})
    }
    //check whether password match
    if(password !== password2){
        errors.push({msg: 'password do not match'})
    }
    if (password.length < 5){
        errors.push({msg: 'password should be more than 5 characters'})
    }
    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    }else {
      //valid info
      User.findOne({ email: email})
        .then(user => {
            if(user){
                //user exists
                errors.push({ msg: 'User exists'})
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
            })
        }else{
            const newUser = new User({
                name,
                email,
                password
            })
            //has password
            bcrypt.genSalt(10, (err, salt) =>
             bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err
                //set password to hashed
                newUser.password = hash
                //save the user
                newUser.save()
                .then(user => {
                    req.flash('success_msg', 'you are now registered user')
                    res.redirect('/users/login')
                })
                .catch(err => console.log(err));
            }))
        }
        })
        .catch()
    }
})
//login handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next)
})
//logout
router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', 'logged out!')
    res.redirect('/users/login')
})
module.exports = router