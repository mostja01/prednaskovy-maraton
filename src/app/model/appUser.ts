import {AngularFirestoreDocument} from '@angular/fire/compat/firestore';

export class AppUser {
  public id: string = '';
  public email: string = '';
  public name: string = '';
  public pavecere: boolean = false;
  public sosnidane: boolean = false;
  public sobed: boolean = false;
  public sovecere: boolean = false;
  public willSleep: boolean = false;
  public student: boolean = false;
  public willAttend: boolean = false;
  public isAdmin = false;

  constructor(data: any, public fireStoreUser: AngularFirestoreDocument<AppUser>) {
    if (data) {
      Object.keys(data).forEach((key) => {
        // @ts-ignore
        this[key] = data[key];
      });
      if (this.id.indexOf('TFaYc9jd5sMuCmJT5Tk') === 0) {
        this.isAdmin = true;
      }
    }
  }

  public hasAllObligatoryFields(): boolean {
    return !!(this.email && !!this.name);
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
      willAttend: this.willAttend,
      willSleep: this.willSleep
    };
  }
}
