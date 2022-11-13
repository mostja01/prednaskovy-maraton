import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TalksPresenter} from '../../shared/classes/talks-presenter';
import {AppUser} from '../../model/appUser';
import {AuthService} from '../../services/auth.service';
import {TopicLinesService} from '../../services/topic-lines.service';
import {Talk} from '../../model/talk';
import {AddTalkComponent} from '../talks-weekend/add-talk/add-talk.component';
import {MatDialog} from '@angular/material/dialog';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends TalksPresenter implements OnInit {
  public profileForm!: FormGroup;
  public savedNotice: boolean = false;
  public registrationClosed = false;
  public prices = ['pavecere','sosnidane' ,'sobed','sovecere','willSleep'];
  private scheduledSaveTimeout: number | null = null;

  constructor(private auth: AuthService,
              private dialog: MatDialog,
              afs: AngularFirestore,
              topicLinesService: TopicLinesService,
              private fb: FormBuilder) {
    super(afs, topicLinesService, auth);
  }

  public pricelist: {[key in typeof this.prices[number]]: number} = {
    'pavecere': 45,
    'sosnidane': 30,
    'sobed': 60,
    'sovecere': 50,
    'willSleep': 200,
  }

  public hasAllObligatoryFields(): boolean {
    return !this.user || this.user?.hasAllObligatoryFields();
  }

  public ngOnInit() {
    this.auth.userData.subscribe((userData: any) => {
      if (userData === null) {
        return;
      }
      this.user = userData;
      this.buildForm();
      if (this.hasAllObligatoryFields() && !this?.user?.willAttend) {
        this.save(false);
      }
    });
  }

  public get myOrderedTalks() {
    const myTalks = this.talksView.filter((talk: Talk) => talk.userId === this.user?.id);
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
      name: new FormControl(this.user?.name || this.auth.lastUsedName, [
        Validators.required,
        Validators.minLength(1)]),
      pavecere: [this.user?.pavecere],
      sosnidane: [this.user?.sosnidane],
      sobed: [this.user?.sobed],
      sovecere: [this.user?.sovecere],
      student: [this.user?.student],
      willSleep: [this.user?.willSleep],
      email: new FormControl({value: this.user?.email, disabled: true}, Validators.required),
    });
    this.profileForm.valueChanges.subscribe(() => {
      if (this.scheduledSaveTimeout) {
        window.clearTimeout(this.scheduledSaveTimeout);
      }
      this.scheduledSaveTimeout = window.setTimeout(() => this.patchUser(), 1000);
    });
  }

  public save(showNotice = true) {
    if (!this.profileForm.valid) {
      return;
    }
    if (!this.user) {
      return;
    }
    this.user.willAttend = true;
    this.patchUser(showNotice);
  }

  // public cancelRegistration() {
  //   if (!this.user) {
  //     return;
  //   }
  //   this.user.willAttend = false;
  //   this.patchUser();
  // }

  public patchUser(showNotice = true) {
    if (!this.user) {
      return;
    }
    this.user.name = this.profileForm.get('name')?.value;
    this.user.pavecere = this.profileForm.get('pavecere')?.value;
    this.user.sosnidane = this.profileForm.get('sosnidane')?.value;
    this.user.sobed = this.profileForm.get('sobed')?.value;
    this.user.sovecere = this.profileForm.get('sovecere')?.value;
    this.user.student = this.profileForm.get('student')?.value;
    this.user.willSleep = this.profileForm.get('willSleep')?.value;
    this.user.patch().then((_) => {
      if (showNotice) {
        this.savedNotice = true;
        window.setTimeout(() => {
          this.savedNotice = false;
        }, 2000);
      }
    });
  }

  public openAddTalkDialog(): void {
    this.dialog.open(AddTalkComponent, {
      width: '800px',
      data: {user: this.user}
    });
  }

  public getAmount(){
    let out = 0;
    this.prices.forEach((priceKey)=>{
      if(this.profileForm.get(priceKey)?.value){
        out += this.pricelist[priceKey];
      }
    })
    return out;
  }
}
