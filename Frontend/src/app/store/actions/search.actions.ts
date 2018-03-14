import { Action } from '@ngrx/store';
import { ErrorResult } from '../../models/error-result';

export const AJAXERROR = 'AJAXERROR';
export const TEST = 'TEST';
export const TESTRESPONSE = 'TESTRESPONSE';

export interface AjaxAwareAction extends Action {
  readonly isAjaxRequest?: boolean;
  readonly isAjaxResponse?: boolean;
  readonly cancelRequestOnNav?: boolean;
}

export class AjaxErrorAction implements AjaxAwareAction {
  readonly type = AJAXERROR;
  constructor(public error: ErrorResult, public cancelRequestOnNavAction: boolean) { }
}

export class TestAction implements AjaxAwareAction {
  readonly type = TEST;
  readonly isAjaxRequest = true;
  readonly cancelRequestOnNav = true;
  constructor(public id: number) { }
}

export class TestResponseAction implements AjaxAwareAction {
  readonly type = TESTRESPONSE;
  readonly isAjaxResponse = true;
  readonly cancelRequestOnNav = true;
  constructor(public value: string) { }
}
