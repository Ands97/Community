import winston from 'winston';
import config from '../config';

class Logger {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.splat(),
        winston.format.json()
      ),
      transports: []
    });

    this.logger.add(
      new winston.transports.Console({
        level: config.logger.level,
        format: winston.format.combine(winston.format.colorize(), winston.format.simple())
      })
    );
  }

  getLogger(): winston.Logger {
    return this.logger;
  }

  log(level: string, message: string, meta?: any): void {
    this.logger.log(level, message, meta);
  }

  silly(message: string, meta?: any): void {
    this.log('silly', message, meta);
  }

  debug(message: string, meta?: any): void {
    this.log('debug', message, meta);
  }

  info(message: string, meta?: any): void {
    this.log('info', message, meta);
  }

  warn(message: string, meta?: any): void {
    this.log('warn', message, meta);
  }

  error(message: string, meta?: any): void {
    this.log('error', message, meta);
  }
}

export default new Logger();
