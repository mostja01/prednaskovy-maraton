import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TalksWeekendComponent } from './talks-weekend.component';

const routes: Routes = [
  {
    path: '',
    component: TalksWeekendComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports: [RouterModule]
})
export class TalksRoutingModule {
}
