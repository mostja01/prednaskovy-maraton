import {Component, Inject} from '@angular/core';
import {AddTalkComponent} from '../talks-weekend/add-talk/add-talk.component';
import {AppUser} from '../../model/appUser';
import {Talk} from '../../model/talk';
import {AuthService} from '../../services/auth.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-talk-detail',
  templateUrl: './talk-detail.component.html',
  styleUrls: ['./talk-detail.component.css']
})
export class TalkDetailComponent {
  public talk: Talk;
  public user!: AppUser;

  constructor(public dialogRef: MatDialogRef<TalkDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog,
              public authService: AuthService,
              private afs: AngularFirestore,
  ) {
    this.talk = data.talk;
    this.authService.userData.subscribe((userData) => {
      if (userData) {
        this.user = userData;
      }
    });
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public edit() {
    this.closeDialog();
    this.dialog.open(AddTalkComponent, {
      width: '800px',
      data: {
        user: this.user,
        talk: this.talk
      }
    });
  }

  public remove() {
    this.closeDialog();
    this.afs.collection('talks').doc(this.talk.talkId).delete();
  }
}
