const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');
const loggedMiddleware = require('../middleware/loggedMiddleware');
const upload = require('../middleware/multer');
const unLoggedMiddleware = require('../middleware/unLoggedMiddleware');
const userValMiddleware = require('../middleware/userValMiddleware');


router.get('/register', unLoggedMiddleware, userController.createUser);
router.post('/register', upload.single('image'), userValMiddleware, userController.createRegister);

router.get('/login', unLoggedMiddleware, userController.login);
router.post('/login', userController.loginProsses);

router.get('/profile', loggedMiddleware, userController.profile);
router.get('/logout', loggedMiddleware, userController.logout);



module.exports = router;