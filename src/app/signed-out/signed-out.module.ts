import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignedOutRoutingModule } from './signed-out-routing.module';
import {HomeComponent} from './home/home.component';
import { TalksComponent } from './talks/talks.component';
import { WarmUpComponent } from './warm-up/warm-up.component';

@NgModule({
  declarations: [
    HomeComponent,
    TalksComponent,
    WarmUpComponent,
  ],
  imports: [
    CommonModule,
    SignedOutRoutingModule
  ]
})
export class SignedOutModule { }
