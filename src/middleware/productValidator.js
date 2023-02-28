const {body} = require('express-validator');
const path = require('path');

const productValidator = [
    body('name')
        .notEmpty().withMessage('Este campo es obligatorio').bail()
        .isLength({ min: 2 }).withMessage('Minimo 2 caracteres'),
    body('description')
        .notEmpty().withMessage('Este campo es obligatorio').bail()
        .isLength({ max : 160 }).withMessage('Maximo 160 caracteres'),
    body('price')
        .notEmpty().withMessage('Este campo es obligatorio').bail()
        .isNumeric().withMessage('Tiene que ser un valor numerico'),
    body('image')
        .custom(( val, {req})=>{
            const file = req.file;

            const arrayFile = ['.jpg', '.png', '.jpeg', '.svg', '.png'];

            if(!file){
                throw new Error('Ingresar una Imagen');
            }else{
                
                const extname = path.extname(file.originalname);
                
                if(!arrayFile.includes(extname)){
                    throw new Error(`Las extenciones validas son ${arrayFile.join(', ')}`);
                };
            };

            return true
        })
];

module.exports = productValidator;