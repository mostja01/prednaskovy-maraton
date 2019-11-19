import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {WarmUpComponent} from './components/warm-up/warm-up.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {ContactComponent} from './components/contact/contact.component';
import {PartnersComponent} from './components/partners/partners.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {ProfileComponent} from './components/profile/profile.component';
import {TalksComponent} from './components/talks/talks.component';
import {TalksWeekendComponent} from './components/talks-weekend/talks-weekend.component';
import {RulesComponent} from './components/rules/rules.component';

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
    path: 'talks-weekend',
    component: TalksWeekendComponent,
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
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'rules',
    component: RulesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
