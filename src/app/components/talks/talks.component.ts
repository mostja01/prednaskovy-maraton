import { Component, OnInit } from '@angular/core';
import {AppUser} from '../../model/appUser';
import {MatDialog} from '@angular/material';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../../services/auth.service';
import {TopicLinesService} from '../../services/topic-lines.service';
import {TalksPresenter} from '../../shared/classes/talks-presenter';

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

  public ngOnInit() {
    this.auth.userData.subscribe((userData: AppUser) => {
      this.user = userData;
    });
  }
}
