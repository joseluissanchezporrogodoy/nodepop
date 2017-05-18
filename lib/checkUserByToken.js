/**
 * Created by joseluissanchez-porrogodoy on 17/05/2017.
 */
const jwt = require('jsonwebtoken');
const config = require('./configJTW');
var checkUserByToken = (data,callback)=>{
    // get the decoded payload and header
    jwt.verify(data, config.jwt.secret,{},(err,decoded)=>{

        if(err){
           callback(err,null)
           return;
        }
        callback(null,decoded.id);
        return;
    });

};//591c69f6f69392237323a524 : [ 89, 28, 104, 252, 109, 208, 162, 35, 88, 245, 142, 33 ] },


module.exports = checkUserByToken;