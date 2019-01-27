import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {TalksComponent} from './talks/talks.component';
import {WarmUpComponent} from './warm-up/warm-up.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'talks',
    component: TalksComponent,
  },
  {
    path: 'warm-up',
    component: WarmUpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignedOutRoutingModule { }
