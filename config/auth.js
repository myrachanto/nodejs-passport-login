const passport = require('passport')
module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if(req.isAuthenticated()) {
            return next()
        }
        req.flash('error_msg', 'Loggin first!')
        res.redirect('/users/login')
    }
}