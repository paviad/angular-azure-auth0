import { Action } from '@ngrx/store';
import * as AppActions from '../actions';
import { AjaxErrorAction } from '../actions';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';

export class SearchState {
  error?: any;
  ajaxInProgress: number;
  ajaxInProgressCancelOnNav: number;
  testValue: string;
}

export const InitialState: SearchState = {
  error: null,
  ajaxInProgress: 0,
  ajaxInProgressCancelOnNav: 0,
  testValue: 'not loaded',
};

export function SearchReducer(state: SearchState = InitialState, action: Action) {
  let newState = state;
  let error;
  let errorAction: AjaxErrorAction;

  newState = clearAjaxError(action, newState, state);
  newState = handleAjaxRequestsAndResponses(action as AppActions.AjaxAwareAction, newState, state);
  newState = handleRouterNavigation(action, newState, state);

  if (action.type === AppActions.AJAXERROR) {
    errorAction = action as AjaxErrorAction;
    error = errorAction.error.err;
    action = errorAction.error.action;
    newState = { ...state, error: errorAction.error.err };
    newState.ajaxInProgress--;
    if (errorAction.cancelRequestOnNavAction) {
      newState.ajaxInProgressCancelOnNav--;
    }
  }
  switch (action.type) {
    case AppActions.TEST:
      newState = reduceTest(action as AppActions.TestAction, newState, error);
      break;
    case AppActions.TESTRESPONSE:
      newState = reduceTestResponse(action as AppActions.TestResponseAction, newState);
      break;
  }
  return newState;
}

function handleRouterNavigation(action: Action, newState: SearchState, state: SearchState) {
  if (action.type === ROUTER_NAVIGATION && newState.ajaxInProgressCancelOnNav) {
    if (newState === state) {
      newState = { ...state };
    }
    newState.ajaxInProgress -= newState.ajaxInProgressCancelOnNav;
    newState.ajaxInProgressCancelOnNav = 0;
  }
  return newState;
}

function handleAjaxRequestsAndResponses(action: AppActions.AjaxAwareAction, newState: SearchState, state: SearchState) {
  if (action.isAjaxRequest) {
    if (newState === state) {
      newState = { ...state };
    }
    newState.ajaxInProgress++;
    if (action.cancelRequestOnNav) {
      newState.ajaxInProgressCancelOnNav++;
    }
  }
  if (action.isAjaxResponse) {
    if (newState === state) {
      newState = { ...state };
    }
    newState.ajaxInProgress--;
    if (action.cancelRequestOnNav) {
      newState.ajaxInProgressCancelOnNav--;
    }
  }
  return newState;
}

function clearAjaxError(action: Action, newState: SearchState, state: SearchState) {
  if (action.type !== AppActions.AJAXERROR && state.error) {
    if (newState === state) {
      newState = {
        ...state,
      };
    }
    newState.error = null;
    // newState.ajaxInProgress--;
    // const errAction = xaction as AjaxErrorAction;
    // if (errAction.cancelOnNavAction) {
    //   newState.ajaxInProgressCancelOnNav--;
    // }
  }
  return newState;
}

function reduceTest(action: AppActions.TestAction, state: SearchState, error: any) {
  const newState = state;
  return newState;
}

function reduceTestResponse(action: AppActions.TestResponseAction, state: SearchState) {
  const newState = { ...state, testValue: action.value };
  return newState;
}
