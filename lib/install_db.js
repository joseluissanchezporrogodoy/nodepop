/**
 * Created by joseluissanchez-porrogodoy on 13/5/17.
 */
"use strict";


//Cargo modelos
require('../models/Advert');
require('../models/User');


const mongoose = require('mongoose');
const Advert = mongoose.model('Advert');
const User = mongoose.model('User');
const fs = require('fs');
const json = JSON.parse(fs.readFileSync('lib/adverts_samples.json',{ encoding: 'utf-8'}));
const conn = mongoose.connection;

//Le decimos a moongose que librería de promesas vamos a usar
mongoose.Promise = global.Promise;


conn.on('error',err=>{
    console.log('Error de conexión',err);
    process.exit(1);
});
conn.once('open',()=>{
    console.log('Conectado a mongoDB');
});

mongoose.connect('mongodb://localhost/nodepop');
// Drop the 'Advert' collection from the current database

/////Borro la base de datos

Advert.remove({},(err,data)=>{
    if (err) {
        console.log(err);
        return;
    }
    console.log('Borrado de anuncios completado');
});
///Creo los esquemas

//require('./models/User');
//require('./models/Advert');