import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { filter, switchMap, map, catchError, takeUntil, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as AppActions from '../actions';
import * as AppReducers from '../reducers';
import { BackendService } from '../../services/backend.service';
import { ErrorResult } from '../../models/error-result';
import { RouterNavigationAction, ROUTER_NAVIGATION } from '@ngrx/router-store';

@Injectable()
export class SearchEffects {
  constructor(private store$: Store<AppReducers.AppState>,
    private action$: Actions,
    private backend: BackendService,
  ) { }

  nav$ = this.action$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION);

  @Effect()
  fetchTestData$ = this.action$.ofType<AppActions.TestAction>(AppActions.TEST).pipe(
    switchMap(r => this.fetchTestData(r.id).pipe(takeUntil(this.nav$))),
    map(r => r instanceof ErrorResult ? this.dispatchError(r, true) : new AppActions.TestResponseAction(r)),
  );

  dispatchError(er: ErrorResult, cancelOnNavAction: boolean = false) {
    return new AppActions.AjaxErrorAction(er, cancelOnNavAction);
  }

  fetchTestData(id: number): Observable<string | ErrorResult> {
    return this.backend.testGet(id).pipe(catchError(r => of(new ErrorResult(r, new AppActions.TestAction(id)))));
  }
}
