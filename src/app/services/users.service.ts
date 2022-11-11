import {Injectable} from '@angular/core';
import {AppUser} from '../model/appUser';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/compat/firestore';

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
      .pipe(map((user: any) => {
        user.id = userId;
        return user;
      }));
  }
}
