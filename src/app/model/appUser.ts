import {AngularFirestoreDocument} from '@angular/fire/firestore';

export class AppUser {
  public id: string = null;
  public email: string = null;
  public name: string = null;
  public lunch: boolean = null;
  public gyza: boolean = null;
  public willAttend: boolean = false;

  constructor(data: any, public fireStoreUser: AngularFirestoreDocument<AppUser>) {
    if (data) {
      Object.keys(data).forEach((key) => {
        this[key] = data[key];
      });
    }
  }

  public hasAllObligatoryFields(): boolean {
    return this.email && !!this.name;
  }

  public patch(): Promise<any> {
    const data = this.getUserData();
    return this.fireStoreUser.update(data);
  }

  public getUserData() {
    return {
      email: this.email,
      name: this.name,
      lunch: this.lunch,
      gyza: this.gyza,
      willAttend: this.willAttend
    };
  }
}
