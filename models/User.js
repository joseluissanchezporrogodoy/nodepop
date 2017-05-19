/**
 * Created by joseluissanchez-porrogodoy on 12/5/17.
 */
"use strict";

const mongoose = require('mongoose');
const sha = require('sha256');

// Definimos el esquema
const userSchema = mongoose.Schema({
    nombre: String,
    //Creo un index para el mail para acelerar búsquedas
    email:  { type: [String], index: true,unique: true },
    clave: String
});


// Método para insertar usuario
userSchema.statics.insertUser = function(data, callback) {
    const pass = sha(data.clave);
    data.clave = pass;
    new User(data).save(callback);
}

//Método que comprueba si ya existe un usuario con ese mail
userSchema.statics.checkUserByMail = function (data, callback) {
    const log = {
        email: data.email
    };

    User.findOne(log, (err, usuarioEncontrado) => {

        if (err) {
            return callback(err, null);
        }
        if (usuarioEncontrado === null) {
            return callback(null, null);
        }
        callback(null, usuarioEncontrado);
    });
}

//Método que comprueba si ya existe un usuario con ese id
userSchema.statics.checkUserById = function (data, callback) {
    const log = {
        _id: data._id
    };
    User.findOne(log, (err, usuarioEncontrado) => {

        if (err) {
            return callback(err, null);
        }
        if (usuarioEncontrado === null) {
            return callback(null, null);
        }
        callback(null, usuarioEncontrado);
    });
}


// Método para comprobar si el user existe y en ese caso que la contraseña es correcta
userSchema.statics.checkUser = function(data, callback) {

    const log = {
        email: data.email
    };
    User.findOne(log, (err, usuario) => {
        if (err) {
            return callback(err, null);
        }
        if (usuario === null) {
            var errorUsuarioEncontrado =new Error('USER_NOT_FOUND');
            errorUsuarioEncontrado.status = '404';
            return callback(errorUsuarioEncontrado);
        }
        //Compruebo la contraseña
        if(usuario.clave===sha(data.clave)){
            callback(null, usuario);
        }else{
            var contraIncorrecta =new Error('INVALID_PASSWORD');
            contraIncorrecta.status = '404';
            return callback(contraIncorrecta, {});
        }

    });
}



// luego creamos el modelo
var User = mongoose.model('User', userSchema);

module.exports = User;