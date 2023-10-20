const winston = require('winston');

const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new winston.transports.File({ filename: 'logfile.log' }),
    ]
});

module.exports = logger;