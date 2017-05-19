/**
 * Created by joseluissanchez-porrogodoy on 12/5/17.
 */
"use strict";

var express = require('express');
var router = express.Router();
const Advert = require('../../models/Advert');
const checkUserByToken = require('../../lib/checkUserByToken');
const fs = require('fs');

// Middleware para checkear los tokens de los usuarios
router.use((req,res,next)=>{
    //Inicia la petición get
    const token = req.query.token;
    checkUserByToken(token,(err,decoded)=>{
        if (err){
            console.log('pasa por aqui');
            console.log(err.message);
            next(err);
            return ;
        }
        next();
        return;
    });

});

/* GET del listado filtrado. */
router.get('/', function(req, res, next) {
    const filter = {};
    const tags = req.query.tag;
    const venta = req.query.venta;
    const nombre = req.query.nombre;
    const precio = req.query.precio;
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const sort = req.query.sort;
    const fields = req.query.fields;

    ///Añadimos al filtro los tags
    if(tags)
        filter.tags = tags;

    ///Vemos si es anuncio de venta o de compra
    if(venta)
        filter.venta = venta;

    ///Filtramos por el nombre
    if(nombre)
        filter.nombre =  new RegExp('^' + req.query.nombre, "i");

    // Filtramos por precio
    if (precio)
        filter.precio = makePriceQuery(precio);

    Advert.list(filter, limit, skip, sort, fields, (err, anuncios) => {
        if (err) {
            return next(err);
        }
        res.json({ success: true, result: anuncios });
        return;
    });
});



/* POST para subir anuncios*/
router.post('/', (req, res, next) => {
    const anuncio = new Advert(req.body);
    anuncio.save((err, data) => {
        if (err) {
            return next(err);
        }
        res.json({success: true, result: data});
    });
});

/* GET de la etiquetas. */
router.get('/tags', function(req, res, next) {
    Advert.returnTags((err,tags)=>{
        if (err){
            next(err);
            return ;
        }
        res.json({ success: true, result: tags });
        return;
    });

});

/* GET de la etiquetas permitidas. */
router.get('/tags_permitted', function(req, res, next) {

         getSome()
        .then(function (data) {
            console.log(data);
        })
        .catch(function(err) {
           console.log(err);
        });

});



function makePriceQuery(precio){
    if (precio.endsWith('-')){
        return { '$gte': parseInt(precio.replace('-','')) };
    } else if (precio.startsWith('-')) {
        return { '$lte': parseInt(precio.replace('-','')) };
    } else if (!precio.includes('-')) {
        return parseInt(precio);
    } else {
        const precioArray = precio.split('-');
        return { '$gte': precioArray[0], '$lte': precioArray[1] };
    }
}

function getSome() {
    return new Promise(function (resolve, reject) {
        fs.readFile('json/tags_permitted.json', 'utf-8', function(err, data) {
            if(err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
}

module.exports = router;