import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { environment } from '../../environments/environment';
import { Router, Route } from '@angular/router';
import { HttpRequest } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../models/user';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {
  private auth0 = new auth0.WebAuth({
    clientID: '0123456789abcdef0123456789abcdef', // replace with your Auth0.com client id
    domain: 'my-auth0-username.eu.auth0.com', // replace with your Auth0.com domain
    responseType: 'token id_token',
    audience: 'https://api.my-api-name.com', // replace with the audience of your Auth0.com api
    redirectUri: environment.Auth0RedirectUri,
    scope: 'openid email',
  });


  private cachedRequests: Array<HttpRequest<any>> = [];
  private redirectRoute: string;

  private loginSubject = new BehaviorSubject<User>(null);
  // private loginSubject = new Subject<User>();
  public login$ = this.loginSubject.asObservable();

  constructor(public router: Router) { }

  public login(redirectRoute?: string): void {
    this.clearSession();
    if (redirectRoute) {
      sessionStorage.setItem('redirectRoute', redirectRoute);
    }
    this.auth0.authorize();
  }

  handleAuthentication(): any {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.redirectRoute = sessionStorage.getItem('redirectRoute');
        if (this.redirectRoute) {
          this.router.navigateByUrl(this.redirectRoute);
          delete this.redirectRoute;
        } else {
          this.router.navigate(['/']);
        }
        this.broadcastLogin();
      } else if (err) {
        this.router.navigate(['/']);
        this.loginSubject.next(null);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  private clearSession(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public logout(): boolean {
    // Remove tokens and expiry time from localStorage
    this.clearSession();
    this.loginSubject.next(null);
    // Go back to the home route
    this.router.navigate(['/']);
    return true;
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }

  public getEmail(): string {
    const helper = new JwtHelper();
    const idToken = localStorage.getItem('id_token');
    if (!idToken) {
      return null;
    }
    const decoded = helper.decodeToken(idToken);
    return decoded.email;
  }

  public getRoles(): { [key: string]: boolean } {
    // ["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    const helper = new JwtHelper();
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      return {};
    }
    const decoded = helper.decodeToken(accessToken);
    const roles: string[] = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    const rc = {};
    (roles || []).forEach(x => rc[x] = true);
    return rc;
  }

  public getName(): string {
    const helper = new JwtHelper();
    const idToken = localStorage.getItem('id_token');
    if (!idToken) {
      return null;
    }
    const decoded = helper.decodeToken(idToken);
    return decoded.name;
  }

  public getUser(): User {
    return new User(this.getEmail(), this.getRoles());
  }

  broadcastLogin(): any {
    const user: User = this.getUser();
    this.loginSubject.next(user);
  }
}
