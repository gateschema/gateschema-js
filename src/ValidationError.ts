import * as I from './interface/index';
export default class ValidationError implements I.ValidationError {
  public path: string;
  public msg: string;
  public keyword: string;
  public value: any;
  public msgParams: I.ValidationErrorMsgParams;
  constructor(options: I.ValidationError) {
    Object.assign(this, options);
  }
}
