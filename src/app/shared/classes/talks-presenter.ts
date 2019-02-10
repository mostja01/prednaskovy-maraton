import {randomColor} from '../random-color';
import {Utils} from '../../model/utils';
import {TopicLinesService} from '../../services/topic-lines.service';
import {AppUser} from '../../model/appUser';
import {Observable} from 'rxjs/internal/Observable';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from '@angular/fire/firestore';
import {Talk, TopicLine} from '../../model/talk';
import {map, take, zipAll} from 'rxjs/operators';
import {Subject} from 'rxjs/internal/Subject';
import {ObservableInput} from 'rxjs/src/internal/types';
import {AuthService} from '../../services/auth.service';

export class TalksPresenter {
  public talks: Observable<DocumentChangeAction<any>[]>;
  public talksCollection: AngularFirestoreCollection<Talk[]>;
  public talksView: Array<Talk> = [];
  public user: AppUser = null;
  private topicLines: Array<TopicLine> = [];

  constructor(public afs: AngularFirestore,
              public topicLinesService: TopicLinesService,
              public authService: AuthService,
  ) {
    this.talksCollection = afs.collection<Talk[]>('talks');
    this.talks = this.talksCollection.snapshotChanges();
    this.makeTalksView().then();
    this.topicLinesService.topicLines.subscribe((lines) => {
      this.topicLines = lines;
      this.fillLinesData();
    });
    authService.userData.subscribe((user) => {
      this.user = user;
    });
  }

  public async makeTalksView() {
    this.getTalks().subscribe((talks: Talk[]) => {
      this.talksView = [];
      talks.forEach((talkData: any) => {
        if (this.user || talkData.mainSchedule) {
          this.talksView.push(talkData);
        }
      });
      this.fillLinesData();
    });
  }

  private getTalks(): Subject<Talk[]> {
    const outStream = new Subject<Talk[]>();

    this.talks.subscribe((talkActions: DocumentChangeAction<any>[]) => {
      const out: Talk[] = [];
      const userStreams: Array<ObservableInput<any>> = [];
      talkActions.forEach((talkAction: DocumentChangeAction<any>) => {
        const data = talkAction.payload.doc.data();
        const id = talkAction.payload.doc.id;
        data.talkRef = talkAction.payload.doc;
        data.talkId = id;
        data.created = new Date(data.created);

        userStreams.push(this.getUserById(data.userId).pipe(
          map((author) => {
            const talkWithUser: Talk = {...data};
            talkWithUser.userName = author.name;
            talkWithUser.color = talkWithUser.color ? talkWithUser.color : randomColor();
            talkWithUser.voters = talkWithUser.voters ? talkWithUser.voters : [];
            talkWithUser.hasVoted = talkWithUser.voters.findIndex((voterId) => {
              return !this.user || voterId === this.user.id;
            }) >= 0;
            talkWithUser.votesCount = talkWithUser.voters.length;
            console.log(talkWithUser);
            return talkWithUser;
          }),
          take(1)
        ).toPromise());
      });
      Promise.all(userStreams).then((talks) => {
        talks.forEach((talkWithUser: any) => {
          out.push(talkWithUser);
        });
        outStream.next(out);
      });
    });

    return outStream;
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
