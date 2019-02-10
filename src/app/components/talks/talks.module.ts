import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TalksComponent} from './talks.component';
import {TalkDetailComponent} from './talk-detail/talk-detail.component';
import {AddTalkComponent} from './add-talk/add-talk.component';
import {SharedComponentsModule} from '../../shared/shared.module';
import {TalksRoutingModule} from './talks-routing.module';
import {TalkPreviewComponent} from './talk-preview/talk-preview.component';

@NgModule({
  imports: [
    CommonModule,
    TalksRoutingModule,
    SharedComponentsModule,
  ],
  declarations: [
    TalkPreviewComponent,
    TalksComponent,
    TalkDetailComponent,
    AddTalkComponent
  ],
  entryComponents: [
    TalkDetailComponent,
    AddTalkComponent],
  exports: [
    TalksComponent,
    TalkDetailComponent,
    AddTalkComponent,
    TalkPreviewComponent,
  ]
})
export class TalksModule {
}
