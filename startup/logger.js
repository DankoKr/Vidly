require('express-async-errors');

module.exports = function(){
    if(!process.env.jwtPrivateKey){
        console.error('FATAL ERROR: Key not devined');
        process.exit(1);
    };    
}