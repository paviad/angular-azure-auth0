import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { filter, map, switchMap, delay, tap, debounceTime } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { AuthService } from './services/auth.service';
import { User } from './models/user';
import * as AppStore from './store';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  login$: Observable<User>;
  loading$: Observable<boolean>;
  ajaxInProgress$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store<AppStore.AppState>) {
    auth.handleAuthentication();
  }

  ngOnInit(): void {
    this.login$ = this.auth.login$;
    this.auth.broadcastLogin();
    this.loading$ = this.router.events.pipe(
      filter(r => r instanceof NavigationStart || r instanceof NavigationEnd || r instanceof NavigationCancel),
      map(r => r instanceof NavigationStart),
      switchMap(r => of(r).pipe(delay(r ? 400 : 0))));
    this.ajaxInProgress$ = this.store.select(x => !!x.search.ajaxInProgress).pipe(
      debounceTime(250)
    );
    this.error$ = this.store.select(state => state.search.error).pipe(tap(r => this.showErrorSnackbar(r)));
  }

  doLogin() {
    this.auth.login();
  }

  doLogout() {
    this.auth.logout();
  }

  showErrorSnackbar(err: HttpErrorResponse) {
    if (!err) {
      return;
    }
    this.snackBar.open(err.statusText, 'Error', {
      politeness: 'assertive',
      duration: 10000,
    });
  }
}
