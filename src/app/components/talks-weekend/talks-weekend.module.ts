import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TalksWeekendComponent} from './talks-weekend.component';
import {TalkDetailComponent} from '../talk-detail/talk-detail.component';
import {AddTalkComponent} from './add-talk/add-talk.component';
import {SharedComponentsModule} from '../../shared/shared.module';
import {TalksRoutingModule} from './talks-weekend-routing.module';
import {TalkPreviewComponent} from '../talk-preview/talk-preview.component';

@NgModule({
  imports: [
    CommonModule,
    TalksRoutingModule,
    SharedComponentsModule,
  ],
  declarations: [
    TalkPreviewComponent,
    TalksWeekendComponent,
    TalkDetailComponent,
    AddTalkComponent
  ],
  entryComponents: [
    TalkDetailComponent,
    AddTalkComponent],
  exports: [
    TalksWeekendComponent,
    TalkDetailComponent,
    AddTalkComponent,
    TalkPreviewComponent,
  ]
})
export class TalksWeekendModule {
}
