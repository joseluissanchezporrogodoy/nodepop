var express = require('express');
var router = express.Router();

const User = require('../../models/User');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Post insertar usuarios users listing. */
router.post('/', function(req, res, next) {

    let userData = { nombre: req.body.nombre, email: req.body.email, clave: req.body.clave};

    //Compruebo si el usuario existe en la base de datos antes de crearlo para no hacerlo dos veces
    let userMail = {email: req.body.email};
    User.checkUserMail(userMail,(err,data)=>{
        if (err) {
            return next(err);
        }
        if(data === null){
            User.insertUser(userData,(err, usuario) => {
                if (err) {
                    return next(err);
                }
                return res.json({ success: true, data: usuario});
            });
        }else {
            next(new Error('USER_REGISTERED'));
        }
    });



});
module.exports = router;
