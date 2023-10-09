const log = (req, res, next) =>{
    console.log('Middleware function....')
    next();
};

module.exports = log;