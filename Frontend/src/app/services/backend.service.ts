import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BackendService {

  constructor(private http: HttpClient) { }

  public testGet(id: number): Observable<string> {
    return this.http.get<string>(`/api/data/${id}`);
  }
}
