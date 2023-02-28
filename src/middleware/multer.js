const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    //destino a donde vana a ir las fotos
    destination: (req, file, cb)=>{
        let reqPath = req.originalUrl.includes('product') ? 'products' : 'users';

        let filePath = path.resolve(__dirname, `../../public/images/${reqPath}`) 
        cb(null, filePath)
    },
    //nombre que van a llevar las fotos
    filename : (req, file, cb)=>{
        let reqPath = req.originalUrl.includes('product') ? 'product-' : 'user-' ;

        let filename= `${reqPath}` + Date.now() + path.extname(file.originalname)
        cb(null, filename)
    }
})

const upload = multer({storage});

module.exports = upload;