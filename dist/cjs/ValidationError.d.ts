import * as I from './interface/index';
export default class ValidationError implements I.ValidationError {
    path: string;
    msg: string;
    keyword: string;
    value: any;
    msgParams: I.ValidationErrorMsgParams;
    constructor(options: I.ValidationError);
}
