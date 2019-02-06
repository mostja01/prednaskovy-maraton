import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppUser} from '../../../model/appUser';
import {Talk, TopicLine} from '../../../model/talk';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {TopicLinesService} from '../../../services/topic-lines.service';
import {randomColor} from '../../../shared/random-color';

@Component({
  selector: 'app-add-talk',
  templateUrl: './add-talk.component.html',
  styleUrls: ['./add-talk.component.css']
})
export class AddTalkComponent {
  public user: AppUser = null;
  public talk: Talk = null;
  public isUploading = false;
  public isEditing = false;
  public addTalkForm: FormGroup;
  public durations = [
    {value: '0:20'},
    {value: '0:50'},
    {value: '0:80'},
    {value: '0:110'},
  ];
  public lines: TopicLine[] = [];
  private itemsCollection: AngularFirestoreCollection<Talk[]>;

  constructor(public dialogRef: MatDialogRef<AddTalkComponent>,
              public fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private afs: AngularFirestore,
              private topicLines: TopicLinesService) {
    this.user = data.user;
    if (data.talk) {
      this.isEditing = true;
      this.talk = data.talk;
    }
    this.buildForm();
    topicLines.topicLines.subscribe((lines) => {
      this.lines = lines;
    });
  }

  public buildForm(): void {
    this.addTalkForm = this.fb.group({
      'name': [this.talk ? this.talk.name : '', [
        Validators.required,
      ]],
      'description': [this.talk ? this.talk.description : ''],
      'duration': [this.talk ? this.talk.duration : null, [
        Validators.required,
      ]],
      'lineId': [this.talk && this.talk.line ? this.talk.line.id : null, [
        Validators.required,
      ]],
      'noteForOrg': [this.talk ? this.talk.noteForOrg : ''],
    });
  }

  public createTalk() {
    Object.keys(this.addTalkForm.controls).map(e => this.addTalkForm.controls[e]).forEach(c => c.markAsTouched());
    if (!this.addTalkForm.valid) {
      return;
    }
    this.isUploading = true;
    const newTalk = {...this.addTalkForm.value};
    newTalk.userId = this.user.fireStoreUser.ref.id;
    if (!this.isEditing) {
      newTalk.created = new Date().toISOString();
    }
    newTalk.lineName = this.lines.filter((line) => line.id === this.addTalkForm.get('lineId').value)[0].name;
    newTalk.color = randomColor();
    this.itemsCollection = this.afs.collection<Talk[]>('talks');

    if (this.talk) {
      this.itemsCollection.doc(this.talk.talkId).update(newTalk).then(() => {
        this.isUploading = false;
        this.dialogRef.close();
      });
    } else {
      const newTalkInit: AngularFirestoreDocument<Talk> = this.itemsCollection.doc(this.afs.createId());
      newTalkInit.set(newTalk).then(() => {
        this.isUploading = false;
        this.dialogRef.close();
      });
    }
  }
}
