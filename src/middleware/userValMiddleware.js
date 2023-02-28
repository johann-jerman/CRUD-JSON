const {body} = require('express-validator');
const path = require('path');


const userValMiddleware = [
    body('name')
        .isLength({min : 2}).withMessage('Minimo 2 caracteres').bail()
        .isLength({max : 20}).withMessage('Maximo 20 caracteres'),
    body('lastname')
        .isLength({min : 2}).withMessage('Minimo 2 caracteres').bail()
        .isLength({max : 20}).withMessage('Maximo 20 caracteres'),
    body('email')
        .isEmail().withMessage('Tiene que ser un mail valido'),
    body('password')
        .isLength({min : 5}).withMessage('Minimo 5 caracteres')
        .custom((val, {req}) => {
            let checkPass = req.body.cheackPassword;

            if(val != checkPass){
                throw new Error ('Las constraseñas tiene que ser iguales')
            }

            return true
        }),
    body('image')
        .custom((val, {req}) => {
            let validExencion = ['.jpg', '.png', 'jpeg'];
            let file = req.file
            let extension = path.extname(file.originalname)

            if(!validExencion.includes(extension)){
                throw new Error (`La extencion de la imagen no es valida ${validExencion.join(', ')}`)
            }

            return true
        })
]

module.exports = userValMiddleware