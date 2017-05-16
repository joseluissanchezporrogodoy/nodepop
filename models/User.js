/**
 * Created by joseluissanchez-porrogodoy on 12/5/17.
 */
"use strict";

const mongoose = require('mongoose');
const sha = require('sha256');
// primero definimos un esquema
const userSchema = mongoose.Schema({
    nombre: String,
    //Creo un index para el mail para acelerar búsquedas
    email:  { type: [String], index: true,unique: true },
    clave: String
});


// creamos un método estático
userSchema.statics.list = function(filter, limit, skip, fields, sort, callback) {
    const query = User.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);
    query.exec(callback);
};

userSchema.statics.insertUser = function(data, callback) {
    const pass = sha(data.clave);
    data.clave = pass;
    new User(data).save(callback);
}

//Con este método compruebo si ya existe un usuario con ese mail
userSchema.statics.checkUserMail = function (data, callback) {
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

userSchema.statics.checkUser = function(data, callback) {
    const log = {
        email: data.email,
        clave: sha(data.clave)
    };
    User.findOne(log, (err, data) => {
        if (err) {
            return callback(err, null);
        }
        if (data === null) {
            return callback(new Error('USER_NOT_FOUND'), {});
        }
        callback(null, data);
    });
}



// luego creamos el modelo
var User = mongoose.model('User', userSchema);

module.exports = User;