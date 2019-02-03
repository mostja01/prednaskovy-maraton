import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {TalksComponent} from './talks/talks.component';
import {WarmUpComponent} from './warm-up/warm-up.component';
import {ContactComponent} from './contact/contact.component';
import {PartnersComponent} from './partners/partners.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';

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
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'partners',
    component: PartnersComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignedOutRoutingModule { }
