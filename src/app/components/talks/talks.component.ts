import {Component, OnInit} from '@angular/core';
import {AppUser} from '../../model/appUser';
import {AuthService} from '../../services/auth.service';
import {TopicLinesService} from '../../services/topic-lines.service';
import {TalksPresenter} from '../../shared/classes/talks-presenter';
import {Talk} from '../../model/talk';
import {AddTalkComponent} from '../talks-weekend/add-talk/add-talk.component';
import {MatDialog} from '@angular/material/dialog';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-talks',
  templateUrl: './talks.component.html',
  styleUrls: ['./talks.component.css']
})
export class TalksComponent extends TalksPresenter implements OnInit {
  public user: AppUser = null;
  // universalTalk = {
  //   color: '#e5e186',
  //   created: new Date(),
  //   hasVoted: false,
  //   mainSchedule: true,
  //   noteForOrg: '',
  //   lineId: 'TG3Qyi9dZGROcygoOYDb',
  //   talkRef: null,
  //   talkId: 'GrizdDtcvFUT37PtT63U',
  //   userId: 'rpw0rg8mFqhz0HOJbm3dWRvHWJI3',
  //   voters: [],
  //   votesCount: 0,
  // };
  //
  // programmingLine = {
  //   line: {color: '#e65252', name: 'Programování, IT, technika', id: 'TG3Qyi9dZGROcygoOYDb'},
  //   lineName: 'Programování, IT, technika',
  // };
  // policyLine = {
  //   line: {color: 'green', name: 'Politika a sociologie', id: 'TG3Qyi9dZGROcygoOYDb'},
  //   lineName: 'Politika a sociologie',
  // };
  // otherLine = {
  //   line: {color: 'orange', name: 'Ostatní', id: 'TG3Qyi9dZGROcygoOYDb'},
  //   lineName: 'Ostatní',
  // };
  // historyLine = {
  //   line: {color: '#e8e248', name: 'Historie, literatura a umění', id: 'TG3Qyi9dZGROcygoOYDb'},
  //   lineName: 'Historie, literatura a umění',
  // };
  // scienceLine = {
  //   line: {color: '#8579ce', name: 'Přírodní vědy', id: 'TG3Qyi9dZGROcygoOYDb'},
  //   lineName: 'Přírodní vědy',
  // };
  // sportLine = {
  //   line: {color: '#a6c8d8', name: 'Pohybové aktivity', id: 'TG3Qyi9dZGROcygoOYDb'},
  //   lineName: 'Pohybové aktivity',
  // };
  // managementLine = {
  //   line: {color: '#337ab7', name: 'Management, ekonomie, psychologie', id: 'TG3Qyi9dZGROcygoOYDb'},
  //   lineName: 'Management, ekonomie, psychologie',
  // };
  // churchLine = {
  //   line: {color: 'orange', name: 'Světská a církevní moc', id: 'TG3Qyi9dZGROcygoOYDb'},
  //   lineName: 'Církev a duchovní moc',
  // };
  // foodLine = {
  //   line: {color: '#e8e248', name: 'Výživa a stravování', id: 'TG3Qyi9dZGROcygoOYDb'},
  //   lineName: 'Výživa a stravování',
  // };

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

  public get orderedTalksMain() {
    return this.talksView.filter((talk: Talk)=>{
      return talk.inMainLine;
    }).sort((a, b) => {
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

  public get orderedTalksOthers() {
    return this.talksView.filter((talk: Talk)=>{
      return !talk.inMainLine;
    }).sort((a, b) => {
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

  public openAddTalkDialog(): void {
    this.dialog.open(AddTalkComponent, {
      width: '800px',
      data: {user: this.user}
    });
  }
}
