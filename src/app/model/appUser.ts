import {AngularFirestoreDocument} from '@angular/fire/compat/firestore';

export class AppUser {
  public id: string = null;
  public email: string = null;
  public name: string = null;
  public pavecere: boolean = null;
  public sosnidane: boolean = null;
  public sobed: boolean = null;
  public sovecere: boolean = null;
  public student: boolean = null;
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
      pavecere: this.pavecere,
      sosnidane: this.sosnidane,
      sobed: this.sobed,
      sovecere: this.sovecere,
      student: this.student,
      willAttend: this.willAttend
    };
  }
}
