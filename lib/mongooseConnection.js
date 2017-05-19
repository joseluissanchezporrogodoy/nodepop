/**
 * Created by joseluissanchez-porrogodoy on 12/05/2017.
 */
"use strict";

const mongoose = require('mongoose');

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

