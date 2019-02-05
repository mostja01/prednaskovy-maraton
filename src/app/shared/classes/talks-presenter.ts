import { randomColor } from '../random-color';
import { Utils } from '../../model/utils';
import { TopicLinesService } from '../../services/topic-lines.service';
import { AppUser } from '../../model/appUser';
import {Observable} from 'rxjs/internal/Observable';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from '@angular/fire/firestore';
import {Talk, TopicLine} from '../../model/talk';
import {map, mergeMap} from 'rxjs/operators';
import {combineLatest} from 'rxjs/internal/observable/combineLatest';

export class TalksPresenter {
  public talks: Observable<DocumentChangeAction<any>[]>;
  public talksCollection: AngularFirestoreCollection<Talk[]>;
  public talksView: Array<Talk> = [];
  public user: AppUser = null;
  private topicLines: Array<TopicLine> = [];

  constructor(public afs: AngularFirestore,
              public topicLinesService: TopicLinesService) {
    this.talksCollection = afs.collection<Talk[]>('talks');
    this.talks = this.talksCollection.snapshotChanges();
    this.makeTalksView().then();
    this.topicLinesService.topicLines.subscribe((lines) => {
      this.topicLines = lines;
      this.fillLinesData();
    });
  }

  public async makeTalksView() {
    this.getTalks().then((talksStream) => {
      talksStream.subscribe((talks) => {
        combineLatest(talks).subscribe((talksData) => {
          this.talksView = [];
          talksData.forEach((talkData: any) => {
            this.talksView.push(talkData);
          });
          this.fillLinesData();
        });
      });
    });
  }

  private async getTalks() {
    return this.talks.pipe(mergeMap(async (talkActions: any) => {
      return await Promise.all(talkActions.map(async (talkAction) => {
        const data = talkAction.payload.doc.data();
        const id = talkAction.payload.doc.id;
        data.talkRef = talkAction.payload.doc;
        data.talkId = id;
        data.created = new Date(data.created);
        return this.getUserById(data.userId).pipe(map((author) => {
          const talkWithUser: Talk = {...data};
          talkWithUser.userName = author.name;
          talkWithUser.color = talkWithUser.color ? talkWithUser.color : randomColor();
          talkWithUser.voters = talkWithUser.voters ? talkWithUser.voters : [];
          talkWithUser.hasVoted = talkWithUser.voters.findIndex((voterId) => {
            return !this.user || voterId === this.user.id;
          }) >= 0;
          talkWithUser.votesCount = talkWithUser.voters.length;
          return talkWithUser;
        }));
      }));
    }));
  }

  private fillLinesData() {
    if (this.topicLines.length > 0 && this.talksView.length > 0) {
      const linesMap = Utils.mapById(this.topicLines);
      this.talksView.forEach((talk: Talk) => {
        if (talk.lineId) {
          talk.line = linesMap[talk.lineId];
        }
      });
    }
  }

  private getUserById(userId: string): Observable<any> {
    return this.afs.collection<any>('users').doc(userId).valueChanges();
  }
}
