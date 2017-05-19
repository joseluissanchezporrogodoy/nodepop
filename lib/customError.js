/**
 * Created by joseluissanchez-porrogodoy on 15/05/2017.
 */

const fs = require('fs');
var customError = function (error,lan){
    return new Promise(function (resolve, reject) {

        if(!lan)
            lan ='es';
        fs.readFile('json/error_table.json', 'utf-8', (err, data) => {
            //Miro si hay error al leer la tabla de errores
            if (err){
                console.log('Error al leer tabla');
                return reject(err);

            }
            try{
                var obj = JSON.parse(data);

            }catch(er) {
                console.log('No se pudo parsear JSON');
                return reject(er);
            }

            const keys= Object.keys(obj);
            var  translateError = '';
            //Busco el error en la tabla y si lo encuentro cojo el texto en el idioma de la petición.
            keys.forEach((key)=>{

                if(key === error){
                    translateError =String(obj[key][lan]);
                    return resolve(translateError);

                }
            });
            return reject('Error no encontrado');
        });
    });
}

module.exports= customError;