var express = require('express');
var router = express.Router();

const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('../../lib/configJTW');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST insertar usuarios. */
router.post('/', function(req, res, next) {
    let userData = { nombre: req.body.nombre, email: req.body.email, clave: req.body.clave};
    //Compruebo si el usuario existe en la base de datos antes de crearlo para no hacerlo dos veces
    //Considero que el mail debe ser único en el sistema

    let userMail = {email: req.body.email};
    User.checkUserByMail(userMail,(err, data)=>{
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

            var errorUsuarioEncontrado =new Error('USER_REGISTERED');
            errorUsuarioEncontrado.status = '401';
            next(errorUsuarioEncontrado);
        }
    });
});

/* POST login usuarios. */

router.post('/autenticate', function(req, res, next) {
    let userData = { email: req.body.email, clave: req.body.clave};
    User.checkUser(userData,(err,data)=>{
        if (err) {
            //Cambiar a usuario no encontrado
            var errorUsuarioEncontrado =new Error('USER_NOT_FOUND');
            errorUsuarioEncontrado.status = '404';
            next(errorUsuarioEncontrado);
            return;
        }
        //Creo el token a partir del campo id
        var token = jwt.sign({ id: data._id },config.jwt.secret, {
            expiresIn: config.jwt.expiresInMinutes,
        });
        res.setHeader('x-access-token', token);
        res.json({success: true, data: token });
    });
});
module.exports = router;
