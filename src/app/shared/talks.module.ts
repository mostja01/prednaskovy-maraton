import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedComponentsModule} from './shared.module';
import {TalkPreviewComponent} from '../components/talk-preview/talk-preview.component';
import {TalksWeekendComponent} from '../components/talks-weekend/talks-weekend.component';
import {AddTalkComponent} from '../components/talks-weekend/add-talk/add-talk.component';
import {TalkDetailComponent} from '../components/talk-detail/talk-detail.component';

@NgModule({
  imports: [
    CommonModule,
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
    AddTalkComponent
  ],
  exports: [
    TalksWeekendComponent,
    TalkDetailComponent,
    AddTalkComponent,
    TalkPreviewComponent,
  ]
})
export class TalksModule {
}
