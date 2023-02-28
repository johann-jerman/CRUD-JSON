const bcrypt = require('bcrypt');


let passHash = bcrypt.hashSync( 'mi contraseña' , 12);
// let passHash2 = bcrypt.hashSync( 'mi contraseña' , 10);

let compareHash = bcrypt.compareSync( 'mi contraseña', passHash );


console.log(passHash);