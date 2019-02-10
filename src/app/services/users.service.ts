import {Injectable} from '@angular/core';
import {AppUser} from '../model/appUser';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(private afs: AngularFirestore) {
  }

  public getUserById(userId: string): Observable<AppUser> {
    return this.afs.collection<AppUser[]>('users')
      .doc<AppUser>(userId)
      .valueChanges()
      .pipe(map((user) => {
        user.id = userId;
        return user;
      }));
  }
}
