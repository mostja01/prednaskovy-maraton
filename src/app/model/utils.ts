import {Observable} from 'rxjs/internal/Observable';

export class Utils {
  public static fireStoreSnapshotFlatMapper(actions): Observable<any> {
    return actions.map((action) => {
      const data = action.payload.doc.data();
      const id = action.payload.doc.id;
      return {...data, id};
    });
  }

  public static mapById(toBeMapped) {
    const out = {};
    toBeMapped.forEach((value) => {
      out[value.id] = value;
    });
    return out;
  }
}
