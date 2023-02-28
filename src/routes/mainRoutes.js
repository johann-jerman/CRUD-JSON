// ------------ declaramos require de express.Router() ------------------
const express = require('express');
const router = express.Router();

//-------------- require de el controlador ----------
const mainController = require('../controller/mainController');

// --------------- declaramos las rutas ------------------------------
router.get('/', mainController.home);




//---------------- exportamos rutas para requerirla en app -----------
module.exports = router;