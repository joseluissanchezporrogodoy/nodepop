/**
 * Created by joseluissanchez-porrogodoy on 12/5/17.
 */
"use strict";

const mongoose = require('mongoose');

// primero definimos un esquema
const advertSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

// creamos un método estático
advertSchema.statics.list = function(filter, limit, skip, fields, sort, callback) {
    const query = Advert.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields); // { nombredecampo: 1, campoquenoquiero: 0 }
    query.sort(sort);
    query.exec(callback);
};


//devuelve las tags que se están utilizando en la base de datos
advertSchema.statics.returnTags= function(callback){
    Advert.distinct("tags",(err,tags)=>{
        if (err) {
            return callback(err, null);
        }
        callback(null,tags);
    });
};


var Advert = mongoose.model('Advert', advertSchema);


module.exports = Advert;