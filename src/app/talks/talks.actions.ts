import { Action } from '@ngrx/store';
import { Talk } from './talks.reducer';

export const CREATE = '[Talks] Create';
export const UPDATE = '[Talks] Update';
export const DELETE = '[Talks] Delete';

export class Create implements Action {
  readonly type = CREATE;
  constructor(public talk: Talk) { }
}

export class Update implements Action {
  readonly type = UPDATE;
  constructor(
    public id: string,
    public changes: Partial<Talk>,
  ) { }
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public id: string) { }
}

export type TalksActions
  = Create
  | Update
  | Delete;
