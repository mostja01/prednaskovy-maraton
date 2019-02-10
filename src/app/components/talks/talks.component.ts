import { Component, OnInit } from '@angular/core';
import {AppUser} from '../../model/appUser';
import {MatDialog} from '@angular/material';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../../services/auth.service';
import {TopicLinesService} from '../../services/topic-lines.service';
import {TalksPresenter} from '../../shared/classes/talks-presenter';
import {AddTalkComponent} from './add-talk/add-talk.component';
import {Talk} from '../../model/talk';

@Component({
  selector: 'app-talks',
  templateUrl: './talks.component.html',
  styleUrls: ['./talks.component.css']
})
export class TalksComponent extends TalksPresenter implements OnInit {
  public user: AppUser = null;

  constructor(
              private dialog: MatDialog,
              public afs: AngularFirestore,
              private auth: AuthService,
              public topicLinesService: TopicLinesService) {
    super(afs, topicLinesService, auth);
  }

  public get newAddedTalks() {
    const newAdded = this.talksView.filter((talk: Talk) => {
      // Return true if was created in last 7 days
      return (Date.now() - talk.created.getTime()) < 5 * 24 * 60 * 60 * 1000;
    });
    return newAdded.sort((a, b) => {
      if (b.created > a.created) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  public get orderedTalks() {
    return this.talksView.sort((a, b) => {
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

  public ngOnInit() {
    this.auth.userData.subscribe((userData: AppUser) => {
      this.user = userData;
    });
  }

  public openAddTalkDialog(): void {
    this.dialog.open(AddTalkComponent, {
      width: '800px',
      data: {user: this.user}
    });
  }
}
