import {Injectable} from '@angular/core';
import {Utils} from '../model/utils';
import {UsersService} from './users.service';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {TopicLine} from '../model/talk';
import {combineLatest} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TopicLinesService {
  public topicLines: BehaviorSubject<TopicLine[]> = new BehaviorSubject([]);

  constructor(private afs: AngularFirestore,
              private users: UsersService) {
    afs.collection<TopicLine[]>('topicLines')
      .snapshotChanges()
      .pipe(map(Utils.fireStoreSnapshotFlatMapper))
      .subscribe((lines: any) => {
        combineLatest(lines
          .filter((line) => line.managerId)
          .map((line: TopicLine) => {
            return users.getUserById(line.managerId);
          }))
          .subscribe((usersData) => {
            const usersMap = Utils.mapById(usersData);
            lines.forEach((line: TopicLine) => {
              if (line.managerId) {
                line.manager = usersMap[line.managerId];
              }
            });
            this.topicLines.next(lines);
          });
      });
  }
}
