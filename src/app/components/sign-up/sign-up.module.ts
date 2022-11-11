import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import {SharedComponentsModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    NgbAlertModule,
    ReactiveFormsModule,
    FormsModule,
    SharedComponentsModule,
    MatFormFieldModule,
    SignUpRoutingModule
  ],
  declarations: [SignUpComponent]
})
export class SignUpModule { }
