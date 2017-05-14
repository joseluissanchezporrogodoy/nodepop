/**
 * Created by joseluissanchez-porrogodoy on 12/5/17.
 */
"use strict";

var express = require('express');
var router = express.Router();
const Advert = require('../../models/Advert');
// no seria necesario requerir el modulo de Agente ya que
// podriamos recuperar el modelo con:
// const mongoose = require('mongoose')
// mongoose.model('Agente')


/* GET /apiv1/adverts */
router.get('/',  function(req, res, next) {

    console.log('me han tocado la fibrilla');
    //const name = req.query.name;
  //  const age = req.query.age;
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const fields = req.query.fields;
    const sort = req.query.sort;

    // creo el filtro vacio
    const filter = {};

  /*  if (name) {
        filter.name = name;
    }

    if (age) {
        filter.age = age;
    }*/

    Advert.list(filter, limit, skip, fields, sort, (err, adverts) => {
        if (err) {
            next(err); // le decimos a express que devuelva el error
            return;
        }

        res.json({ success: true, result: adverts });

    });

});

/*// POST /apiv1/agentes
router.post('/', (req, res, next) => {
    console.log(req.body);

    // validar

    // creamos un objeto de tipo Agente
    const agente = new Agente(req.body);
    // lo guardamos en la base de datos
    agente.save((err, agenteGuardado) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ success: true, result: agenteGuardado});
    });
});*/


module.exports = router;