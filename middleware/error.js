const logger = require('../config/logger'); 

//Ctaches errors during api request calls

module.exports = function(error, req, res, next){
    logger.error(error.message); 
    res.status(500).send('Something failed....');
}
