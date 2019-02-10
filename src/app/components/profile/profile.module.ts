import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {SharedComponentsModule} from '../../shared/shared.module';
import {TalksWeekendModule} from '../talks-weekend/talks-weekend.module';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    ProfileRoutingModule,
    TalksWeekendModule,
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule {
}

