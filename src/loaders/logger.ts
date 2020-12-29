import { Service } from 'typedi';
import { ILogger } from '../interfaces/ILogger';
@Service()
class Logger implements ILogger {
  public debug(msg: string | Error, ...optionalParams: any[]): void {
    console.debug(`Debug: ${msg}`, ...optionalParams);
  }
  public info(msg: string | Error, ...optionalParams: any[]): void {
    console.info(`Info: ${msg}`, ...optionalParams);
  }
  public warn(msg: string | Error, ...optionalParams: any[]): void {
    console.warn(`Warn: ${msg}`, ...optionalParams);
  }
  public error(msg: string | Error, ...optionalParams: any[]): void {
    console.error(`Error: ${msg}`, ...optionalParams);
  }
}

export default Logger;
