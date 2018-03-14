import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { filter, switchMap, map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as AppActions from '../actions';
import * as AppReducers from '../reducers';
import { ErrorResult } from '../../models/error-result';
import { RouterNavigationAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { BackendService } from '../../services/backend.service';

@Injectable()
export class RouterEffects {
  constructor(private store$: Store<AppReducers.AppState>,
    private action$: Actions,
    private backend: BackendService,
  ) { }

  // @Effect()
  // clearData$ = this.action$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION).pipe(
  //   map(r => new AppActions.ClearDataAction())
  // );
}
