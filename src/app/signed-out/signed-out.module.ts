import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignedOutRoutingModule } from './signed-out-routing.module';
import {HomeComponent} from './home/home.component';
import { TalksComponent } from './talks/talks.component';
import { WarmUpComponent } from './warm-up/warm-up.component';
import {ContactComponent} from './contact/contact.component';
import { PartnersComponent } from './partners/partners.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  declarations: [
    HomeComponent,
    TalksComponent,
    WarmUpComponent,
    ContactComponent,
    PartnersComponent,
    SignUpComponent,
    SignInComponent,
  ],
  imports: [
    CommonModule,
    SignedOutRoutingModule
  ]
})
export class SignedOutModule { }
