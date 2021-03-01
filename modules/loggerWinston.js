const { createLogger, format, transports } = require('winston');
const { combine } = format;

const  logger = createLogger({
    format : combine(
        format.colorize(),
        format.prettyPrint(),
        format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
        format.splat(),
        format.simple(),
    ),
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6
    },
    transports: [
        new transports.Console(),
    ],
});

module.exports = {
    logger
}
