import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TalksComponent} from './talks.component';
import {TalkDetailComponent} from './talk-detail/talk-detail.component';
import {AddTalkComponent} from './add-talk/add-talk.component';
import {TalkPreviewModule} from './talk-preview/talk-preview.module';
import {SharedComponentsModule} from '../../shared/shared.module';
import {TalksRoutingModule} from './talks-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TalksRoutingModule,
    SharedComponentsModule,
    TalkPreviewModule
  ],
  declarations: [TalksComponent, TalkDetailComponent, AddTalkComponent],
  entryComponents: [TalkDetailComponent, AddTalkComponent],
  exports: [TalksComponent, TalkDetailComponent, AddTalkComponent]
})
export class TalksModule {
}
