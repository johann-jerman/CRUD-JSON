const User = require('../services/Users')

function userLoggedMiddleware (req, res, next){
    
    res.locals.isLogged = false

    const cookieUser = req.cookies.userEmail 
    const user = User.findByField ( 'email', cookieUser)

    if(cookieUser){
        req.session.userLogged = user
    }

    if(req.session && req.session.userLogged){
        res.locals.isLogged = true
        res.locals.userLogged = req.session.userLogged
    }

    next()
}

module.exports = userLoggedMiddleware