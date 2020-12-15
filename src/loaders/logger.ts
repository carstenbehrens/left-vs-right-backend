import { ILogger } from '../interfaces/ILogger';

class Logger implements ILogger {
  public debug(msg: string | Error, ...optionalParams: any[]): void {
    console.debug(msg, ...optionalParams);
  }
  public info(msg: string | Error, ...optionalParams: any[]): void {
    console.info(msg, ...optionalParams);
  }
  public warn(msg: string | Error, ...optionalParams: any[]): void {
    console.warn(msg, ...optionalParams);
  }
  public error(msg: string | Error, ...optionalParams: any[]): void {
    console.error(msg, ...optionalParams);
  }
}

export default Logger;
