// -------- declaro mi controlador --------------
const mainController = {
    home: (req, res) => {
        res.render('index');
    }
};



// ---------- exporto el controlador ---------------------
module.exports = mainController;