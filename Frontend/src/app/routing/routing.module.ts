import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { CallbackComponent } from '../pages/callback/callback.component';
import { OtherComponent } from '../pages/other/other.component';

const routes: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'other', component: OtherComponent },
  { path: 'callback', component: CallbackComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  providers: [],
  exports: [RouterModule]
})
export class RoutingModule { }
