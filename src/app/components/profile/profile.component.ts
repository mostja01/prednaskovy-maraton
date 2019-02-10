import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {TalksPresenter} from '../../shared/classes/talks-presenter';
import {AppUser} from '../../model/appUser';
import {AuthService} from '../../services/auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {TopicLinesService} from '../../services/topic-lines.service';
import {Talk} from '../../model/talk';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends TalksPresenter implements OnInit {
  public profileForm;
  public user: AppUser = null;
  public savedNotice: boolean = false;
  public registrationClosed = true;

  constructor(private auth: AuthService,
              public afs: AngularFirestore,
              public topicLinesService: TopicLinesService,
              private fb: FormBuilder) {
    super(afs, topicLinesService);
  }

  public hasAllObligatoryFields(): boolean {
    return !this.user || this.user.hasAllObligatoryFields();
  }

  public ngOnInit() {
    this.auth.userData.subscribe((userData: AppUser) => {
      if (userData === null) {
        return;
      }
      this.user = userData;
      this.buildForm();
    });
  }

  public get myOrderedTalks() {
    const myTalks = this.talksView.filter((talk: Talk) => talk.userId === this.user.id);
    return myTalks.sort((a, b) => {
      if (b.voters.length === a.voters.length) {
        if (b.name > a.name) {
          return -1;
        } else {
          return 1;
        }
      }
      return b.voters.length - a.voters.length;
    });
  }

  public buildForm(): void {
    this.profileForm = this.fb.group({
      name: new FormControl(this.user.name, [
        Validators.required,
        Validators.minLength(1)]),
      lunch: [this.user.lunch],
      gyza: [this.user.gyza],
      email: new FormControl({value: this.user.email, disabled: true}, Validators.required),
    });
  }

  public save() {
    if (!this.profileForm.valid) {
      return;
    }
    this.user.willAttend = true;
    this.patchUser();
  }

  public cancelRegistration() {
    this.user.willAttend = false;
    this.patchUser();
  }

  public patchUser() {
    this.user.name = this.profileForm.get('name').value;
    this.user.lunch = this.profileForm.get('lunch').value;
    this.user.gyza = this.profileForm.get('gyza').value;
    this.user.patch().then((_) => {
      this.savedNotice = true;
      window.setTimeout(() => {
        this.savedNotice = false;
      }, 2000);
    });
  }
}
