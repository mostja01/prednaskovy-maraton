import {Component, Input} from '@angular/core';
import {TalkDetailComponent} from '../talk-detail/talk-detail.component';
import {MatDialog} from '@angular/material';
import {Talk} from '../../model/talk';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {AppUser} from '../../model/appUser';

@Component({
  selector: 'app-talk-preview',
  templateUrl: './talk-preview.component.html',
  styleUrls: ['./talk-preview.component.css']
})
export class TalkPreviewComponent {
  @Input()
  public talk: Talk;
  @Input()
  public user: AppUser;
  @Input()
  public showVotes: boolean = true;

  private isVoteInProgress = false;

  constructor(private dialog: MatDialog,
              private afs: AngularFirestore) {
  }

  public openTalkDialog(talk: Talk): void {
    this.dialog.open(TalkDetailComponent, {
      width: '800px',
      data: {talk}
    });
  }

  public get showVoteButton() {
    return !!this.user;
  }

  // public updateTalk(id, name) {
  //   this.store.dispatch(new talkActions.Update(id, {name: name}));
  // }
  //
  // public deleteTalk(id) {
  //   this.store.dispatch(new talkActions.Delete(id));
  // }

  public upVote() {
    if (this.isVoteInProgress) {
      return;
    }
    this.isVoteInProgress = true;
    const itemsCollection = this.afs.collection<Talk[]>('talks');
    const talkDocument: AngularFirestoreDocument<Talk> = itemsCollection.doc(this.talk.talkId);
    if (this.talk.voters.findIndex((voterId) => voterId === this.user.id) >= 0) {
      this.isVoteInProgress = false;
      return;
    }
    this.talk.voters.push(this.user.id);
    talkDocument.update({
      voters: this.talk.voters
    }).then(() => {
      this.isVoteInProgress = false;
    });
  }

  public downvote() {
    if (this.isVoteInProgress) {
      return;
    }
    this.isVoteInProgress = true;
    const itemsCollection = this.afs.collection<Talk[]>('talks');
    const talkDocument: AngularFirestoreDocument<Talk> = itemsCollection.doc(this.talk.talkId);
    if (this.talk.voters.findIndex((voterId) => voterId === this.user.id) === -1) {
      return;
    }
    const userIndex = this.talk.voters.indexOf(this.user.id);
    this.talk.voters.splice(userIndex, 1);
    talkDocument.update({
      voters: this.talk.voters
    });
  }

}
