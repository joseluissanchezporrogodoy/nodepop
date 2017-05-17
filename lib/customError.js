/**
 * Created by joseluissanchez-porrogodoy on 15/05/2017.
 */

const fs = require('fs');

var customError =  (error,lan,callback)=>{
    console.log(lan);

    fs.readFile('./lib/error_table.json', 'utf-8', (err, data) => {
        //Miro si hay error al leer la tabla de errores
        if (err){
            console.log('Error al leer tabla');
            callback(null);
            return;
        }
        try{
            var obj = JSON.parse(data);

        }catch(er) {
            console.log('No se pudo parsear JSON');
            callback(null);
            return;
        }

        const keys= Object.keys(obj);
        var  translateError = '';
        //Busco el error en la tabla y si lo encuentro cojo el texto en el idioma de la petición.
        keys.forEach((key)=>{

            if(key === error){
                translateError =String(obj[key][lan]);
                callback(translateError);
                return;
            }
        });
    });
}

module.exports=customError;