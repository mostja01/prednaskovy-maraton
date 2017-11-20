import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'talks',
    loadChildren: './talks/talks.module#TalksModule'
  },
  {
    path: 'sign-up',
    loadChildren: './sign-up/sign-up.module#SignUpModule'
  },
  {
    path: 'partners',
    loadChildren: './partners/partners.module#PartnersModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
