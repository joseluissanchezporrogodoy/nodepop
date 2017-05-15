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

async function main() {

    //Borro anuncios
    await  Advert.remove({});//El códise para aquí hasta que se completa la promesa
    console.log('Ha terminado de borrar anuncios');

    //Borro usuarios
    await User.remove({});
    console.log('Ha terminado de borrar usuarios');

    //Inserto anuncios
    await Advert.insertMany(json.anuncios);
    console.log('Insertados anuncios de ejemplo');

    //Inserto usuario de prueba
    let user = { nombre: 'Jose', email: 'jose@gmail.com', clave: 'clave'};
    const newUser = new  User(user);
    await newUser.save(user);
    console.log('User insertado');

    //Termino el proceso
    process.exit(0);
}

main().then(()=>{})
    .catch(err=>{
        console.log('Hubo un error',err);
    });