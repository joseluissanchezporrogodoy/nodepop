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

};

module.exports = checkUserByToken;