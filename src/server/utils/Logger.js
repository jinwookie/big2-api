import winston from 'winston';

const logger = new winston.Logger({
  level: 'info',
  transports: [
    new (winston.transports.Console)()
    //,new (winston.transports.File)({ filename: 'somefile.log' })
  ]
});

export default logger;
