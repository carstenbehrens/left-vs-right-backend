export interface ILogger {
  debug(message: string | Error, ...optionalParams: any[]): void;
  warn(message: string | Error, ...optionalParams: any[]): void;
  error(message: string | Error, ...optionalParams: any[]): void;
  info(message: string | Error, ...optionalParams: any[]): void;
}
