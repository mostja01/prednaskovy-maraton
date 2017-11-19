import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { talkReducer } from './talks.reducer';
import { StoreModule } from '@ngrx/store';
import { TalksComponent } from './talks.component';

const routes: Routes = [
  {
    path: '',
    component: TalksComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    StoreModule.forFeature('talks', talkReducer),
  ],
  exports: [RouterModule]
})
export class TalksRoutingModule { }
