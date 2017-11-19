import { ActionReducerMap } from '@ngrx/store';
import { talkReducer } from '../talks/talks.reducer';

export const reducers: ActionReducerMap<any> = {
  talk: talkReducer,
};
