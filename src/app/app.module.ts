import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from './services/auth.service';
import {HomeComponent} from './components/home/home.component';
import {WarmUpComponent} from './components/warm-up/warm-up.component';
import {ContactComponent} from './components/contact/contact.component';
import {PartnersComponent} from './components/partners/partners.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {NavComponent} from './components/nav/nav.component';
import {SharedComponentsModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {MatButtonModule, MatCheckboxModule, MatDialogModule, MatIconModule, MatInputModule, MatSelectModule} from '@angular/material';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import {ProfileComponent} from './components/profile/profile.component';
import {TalksModule} from './components/talks/talks.module';
import {ProfileModule} from './components/profile/profile.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WarmUpComponent,
    ContactComponent,
    PartnersComponent,
    SignUpComponent,
    SignInComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    SharedComponentsModule,
    NgbAlertModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    TalksModule,
    ProfileModule,
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
