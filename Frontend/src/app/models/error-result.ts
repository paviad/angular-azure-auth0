import { Action } from '@ngrx/store';

export class ErrorResult {
  constructor(public err: any, public action: Action) { }
}
