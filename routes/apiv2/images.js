/**
 * Created by joseluissanchez-porrogodoy on 17/05/2017.
 */
'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/:imagen', (req, res, next) => {
    const ruta = path.join(__dirname, '../../public/images', req.params.imagen);

    res.sendFile(ruta);
});
module.exports = router;