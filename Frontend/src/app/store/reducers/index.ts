import { ActionReducer, ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import * as AppActions from '../actions';
import * as AppReducers from './search.reducers';
import * as RouterReducers from './router.reducers';

export * from './search.reducers';
export * from './router.reducers';

export interface AppState {
  routerReducer: fromRouter.RouterReducerState<RouterReducers.RouterStateUrl>;
  search: AppReducers.SearchState;
}

export const reducers: ActionReducerMap<AppState> = {
  routerReducer: fromRouter.routerReducer,
  search: AppReducers.SearchReducer
};

export const selectSearchState = createFeatureSelector<AppReducers.SearchState>('search');
export const selectRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterReducers.RouterStateUrl>>('routerReducer');
