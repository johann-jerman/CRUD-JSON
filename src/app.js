// ---- declaramos requerimientos -----------
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const cookie = require('cookie-parser')
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;


// ---- declarando rutas que conectan con los controladores ------
const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const userLoggedMiddleware = require('./middleware/userLoggedMiddleware');

// ------ declaramos carpatas de public views y ejs ------------------
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));


// --- urlencode permite recibir la info de la url --------------------
app.use(express.urlencoded( {extended : true} ));
// --- transforma la info de la url en JSON
app.use(express.json());


// --- poder utilizar metodos put y delete --------------------------------
app.use(methodOverride('_method'));

// ----- aplicamos middleware de session
app.use(session({
    secret : 'Este mensage es secreto',
    resave : false,
    saveUninitialized : false
}))
// ----- cookies --------
app.use(cookie('hola'));

app.use(userLoggedMiddleware)


// ---- MIDDLEWARE que utiliza el requerimiento de las turas ----------------
app.use(mainRoutes);
app.use('/product', productsRoutes);
app.use('/user', usersRoutes);


// ----  declaramos codigo del error 404 que carga la vista error.ejs -----
// app.use((req, res)=>{
//     res.status(404).render('error')
// })


// ------ cargado del servidor
app.listen(PORT, ()=>{
    console.log(`http://www.localhost${PORT}`);
});