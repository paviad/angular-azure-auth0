import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as AppStore from '../../store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  test$: Observable<string>;

  constructor(private store: Store<AppStore.AppState>) {
    this.test$ = store.select(state => state.search.testValue);
  }

  ngOnInit() {
  }

  test() {
    this.store.dispatch(new AppStore.TestAction(0));
  }
}
