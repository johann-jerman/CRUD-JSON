// requerimos fs y path para leer el JSON
const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');

// declaramos la ruta con path del json
const productsPath = path.resolve(__dirname, '../data/products.json');
// leemos el archivo json con fs y le hacemos JSON.parce para pasarlo de formato json a array
let products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'))//importante que sea con let por que sino no podemos reescruibir el archivo

// declaramos un controlador que vamos a exportar
const productsController = {
    // renderisa la vista products que muestra todos los productos
    products: (req, res) => {
        //el 2do parametros es mi listado de productos para usarlos en el ejs de products.ejs en este caso en un for que muestre todos los productos
        res.render('products', {
            products
        })
    },
    // ruta por get que muestar un producto especifica 
    edit: (req, res)=>{
        //implementamos la misma logica que en detail
        let idUrl = req.params.id; //id que nos llega del navegador
        let product = products.find(product => product.id == idUrl);
        
        res.render('edit', {
            product
        })
    },
    update: (req, res)=>{
        //implementamos la misma logica que en detail
        let idUrl = req.params.id; 
        let product = products.find(product => product.id == idUrl);
        
        //reescribimos el valor de prodct al que nos llega del formulario
        // req.body son los elementos que llegan del formulario
        let body = req.body;
        
        //cambiamos los valores de product por los valores que nos llegan del formulario
        product.name = body.name;
        product.decription = body.decription;
        product.price = body.price;
        product.size = body.size;
        product.category = body.category;
        
        //reescribimos los valores al json
        fs.writeFileSync(productsPath ,JSON.stringify(products, null, ' '))
        
        //redirigimos a la ruta de product
        res.redirect('/')
    },
    delete: (req, res)=>{
        //implementamos la misma logica que en detail
        
        let idUrl = req.params.id; 
        let product = products.find(product => product.id == idUrl);
        
        res.render('delete',{
            product
        })
    },
    create: (req, res)=>{
        res.render('create')
    },
    storage : (req, res)=>{
        // elementos que nos llegan del formulario
        let body = req.body// todo menos la imagen/s
        let file = req.file//la imagen/s
        let errors = validationResult(req)
        
        if(! errors.isEmpty()){
            return res.render('create', {
                errors: errors.mapped(),
                old: body
            })
        }

        //generamos un objeto con todo lo que nos llega del formulario y el id
        let newProduct={
            ...body, 
            id : Date.now(),
            image : file? file.filename : ' '
        };
        //pusheamos el nuevo producto a el array del json
        products.unshift(newProduct);
        //sobreescribimos el json
        fs.writeFileSync(productsPath ,JSON.stringify(products, null, ' '))
        
        res.redirect('/product');
    },
    detail: (req, res)=>{
        //nesesitamos encontrar un producto, para hacer esto nesesitamos el id que no llega del url
        //para conseguir el id del url pordemos usar req.params.id
        let idUrl = req.params.id; //id que nos llega del navegador
        
        //usamos el metodo find sobre products para poder encontrar el producto que queremos mostrar y lo guardamos en una variable
        let product = products.find(product => product.id == idUrl);
        
        //renderisamos detail.ejs y le mandamos el producto que buscamos 
        res.render('detail', {
            product
        })
    },
    erase: (req, res)=>{
        // id que nos llega del url
        let idUrl = req.params.id; 
        // buscamos el producto
        let product = products.find(product => product.id == idUrl);
        // buscamo el index del producto
        let index = products.indexOf(product);
        
        //eliminamos el producto
        products.splice(index, 1);
        
        
        fs.unlinkSync(path.resolve(__dirname, '../../public/images/products/' + product.image))
        
        //sobreescribimos el json
        fs.writeFileSync(productsPath ,JSON.stringify(products, null, ' '))

        res.redirect('/')
    }

}

// exportamos el controlador para requerirlo en productsRoutes.js
module.exports = productsController