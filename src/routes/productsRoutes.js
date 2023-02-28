// ------------ declaramos require de express.Router() ------------------
const express = require('express');
const router = express.Router();

const productValidator = require('../middleware/productValidator')

//-------------- require de el controlador ----------
const productsController = require('../controller/productsController');
const upload = require('../middleware/multer');

router.get('/create', productsController.create);
router.post('/create' ,upload.single('image') ,productValidator ,productsController.storage);

// --------------- declaramos las rutas ------------------------------
//ruta por get que muestra el listado de todos los productos
router.get('/', productsController.products);

//muestra un producto en especifico
router.get('/:id', productsController.detail);
//rutas de edicion de producto
router.get('/edit/:id', productsController.edit);
router.put('/edit/:id', productsController.update);

//rutas de elinimar producto
router.get('/delete/:id', productsController.delete);
router.delete('/delete/:id', productsController.erase);



//---------------- exportamos rutas para requerirla en app -----------
module.exports = router;