import { NgModule } from '@angular/core';
import { TalkPreviewComponent } from './talk-preview.component';
import { CommonModule } from '@angular/common';
import {SharedComponentsModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
  ],
  declarations: [TalkPreviewComponent],
  exports: [TalkPreviewComponent]
})
export class TalkPreviewModule {
}
