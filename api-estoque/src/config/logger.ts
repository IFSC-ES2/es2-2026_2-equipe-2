import {
  createLogger,
  format,
  transports,
  Logger as WinstonLogger,
} from "winston";
const { combine, timestamp, printf } = format;

class Logger {
  private logger: WinstonLogger;
  private logLevel: string;
  private logFilename: string;

  constructor() {
    this.logLevel = process.env.LOG_LEVEL || "info";
    this.logFilename = process.env.LOG_FILENAME || "logs/api.log";
    this.logger = this.createLogger();
  }

  private getLocalTime(): string {
    return new Date().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      hour12: false,
    });
  }

  private createLogger(): WinstonLogger {
    return createLogger({
      level: this.logLevel,
      format: combine(
        timestamp({ format: () => this.getLocalTime() }),
        printf(
          ({ timestamp, level, message }) =>
            `${timestamp} ${level}: ${message}`,
        ),
      ),
      transports: this.createTransports(),
    });
  }

  private createTransports(): (
    transports.ConsoleTransportInstance | transports.FileTransportInstance
  )[] {
    const transportsList: (
      transports.ConsoleTransportInstance | transports.FileTransportInstance
    )[] = [new transports.Console()];

    if (this.logFilename) {
      transportsList.push(
        new transports.File({
          filename: this.logFilename,
          maxsize: 20 * 1024 * 1024, // 20MB
          maxFiles: 5,
        }),
      );
    }

    return transportsList;
  }

  // Métodos públicos para logging
  public info(message: string, ...meta: any[]): void {
    this.logger.info(message, ...meta);
  }

  public error(message: string, ...meta: any[]): void {
    this.logger.error(message, ...meta);
  }

  public warn(message: string, ...meta: any[]): void {
    this.logger.warn(message, ...meta);
  }

  public debug(message: string, ...meta: any[]): void {
    this.logger.debug(message, ...meta);
  }

  public verbose(message: string, ...meta: any[]): void {
    this.logger.verbose(message, ...meta);
  }

  public silly(message: string, ...meta: any[]): void {
    this.logger.silly(message, ...meta);
  }

  public getWinstonLogger(): WinstonLogger {
    return this.logger;
  }
}

export default new Logger();
