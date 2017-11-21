import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RulesRoutingModule } from './rules-routing.module';
import { RulesComponent } from './rules.component';

@NgModule({
  imports: [
    CommonModule,
    RulesRoutingModule
  ],
  declarations: [RulesComponent]
})
export class RulesModule {
}
