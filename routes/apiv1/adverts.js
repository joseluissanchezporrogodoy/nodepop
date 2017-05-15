/**
 * Created by joseluissanchez-porrogodoy on 12/5/17.
 */
"use strict";

var express = require('express');
var router = express.Router();
const Advert = require('../../models/Advert');

/* GET de el listado completo de anuncios, sin filtro. */
router.get('/', function(req, res, next) {
    Advert.find().exec((err, list) => {
        if (err) {
            return next(err);
        }
        res.json({ ok: true, list: list})
    });
});



module.exports = router;