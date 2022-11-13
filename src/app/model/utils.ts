import {Observable} from 'rxjs/internal/Observable';

interface WithId {
  id: string;
}

export class Utils {
  public static fireStoreSnapshotFlatMapper(actions: any): Observable<any> {
    return actions.map((action: any) => {
      const data = action.payload.doc.data();
      const id = action.payload.doc.id;
      return {...data, id};
    });
  }

  public static mapById<T extends WithId>(toBeMapped: Array<T>): { [key: string]: T } {
    const out: { [key: string]: T } = {};
    toBeMapped.forEach((value) => {
      out[value.id] = value;
    });
    return out;
  }
}
