/**
 * Created by joseluissanchez-porrogodoy on 12/5/17.
 */
"use strict";

const mongoose = require('mongoose');

// primero definimos un esquema
const userSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});

// creamos un método estático
userSchema.statics.list = function(filter, limit, skip, fields, sort, callback) {
    const query = User.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields); // { nombredecampo: 1, campoquenoquiero: 0 }
    query.sort(sort);
    query.exec(callback);
};

// luego creamos el modelo
var User = mongoose.model('User', userSchema);

// Realmente no es necesario exportarlo, ya que en otrs sitios
// podriamos recuperar el modelo usando:

module.exports = User;