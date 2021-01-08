/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ILogger } from '../interfaces/ILogger';

export default class MockLogger implements ILogger {
  public debug(msg: string | Error, ...optionalParams: any[]): void {}
  public info(msg: string | Error, ...optionalParams: any[]): void {}
  public warn(msg: string | Error, ...optionalParams: any[]): void {}
  public error(msg: string | Error, ...optionalParams: any[]): void {}
}
