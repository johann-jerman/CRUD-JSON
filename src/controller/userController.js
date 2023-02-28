
const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');
const User = require('../services/Users');


const userController = {
    createUser (req, res){
        res.render('auth/register');
    },

    createRegister (req, res){
        let body = {
            ...req.body,
            password : bcryptjs.hashSync(req.body.password, 10),
            image : req.file ? req.file.filename : 'default.png' 
        }
        
        // TODO: AGREGRA VALIDACIONES DE USUARIO

        let userFound = User.findByField('email', body.email);
        
        if(userFound){
            return  res.render('./auth/register', {
                error : {
                    email : {
                        msg: 'Este mail ya existe'
                    }
                }
            })
        }
        

        delete body.cheackPassword;

        User.createUser(body);

        return res.redirect('/user/login');

    },

    login (req, res){
        res.render('auth/login');
    },

    loginProsses (req, res){
        let body = req.body
        
        let userToLogin = User.findByField('email', body.email);
        
        if(userToLogin){
            
            let compare = bcryptjs.compareSync( req.body.password, userToLogin.password)

            if(compare){
                delete userToLogin.password
                req.session.userLogged = userToLogin
                if(body.rememberme){
                    res.cookie('userEmail', body.email , {maxAge : 1000*60*5})
                }

                return res.redirect('/user/profile')
            }
        }

        res.send('no entra')
        // res.redirect('/user/profile',{
        //     // toLogin
        // })
    },

    profile (req, res) {
        res.render('auth/profile', {
            user: req.session.userLogged
        });
    },
    logout (req, res){

        req.session.destroy()
        res.clearCookie('userEmail')
        res.redirect('/')
    }  
}

module.exports = userController;