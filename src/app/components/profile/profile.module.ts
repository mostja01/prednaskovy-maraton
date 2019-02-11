import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {SharedComponentsModule} from '../../shared/shared.module';
import {TalksModule} from '../../shared/talks.module';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    ProfileRoutingModule,
    TalksModule,
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule {
}

