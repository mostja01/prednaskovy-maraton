import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromTalk from './talks.reducer';
import * as talkActions from './talks.actions';

@Component({
  selector: 'app-talks',
  templateUrl: './talks.component.html',
  styleUrls: ['./talks.component.css']
})
export class TalksComponent implements OnInit {

  talks: Observable<fromTalk.Talk[]>;

  constructor(private store: Store<fromTalk.TalkState>) {
  }

  ngOnInit() {
    this.talks = this.store.select(fromTalk.selectAll);
    this.talks.subscribe(data => {
      console.log(data);
    });
  }

  createTalk(name: string) {
    const pizza: fromTalk.Talk = {
      id: new Date().getUTCMilliseconds().toString(),
      name,
    };

    this.store.dispatch(new talkActions.Create(pizza));
  }

  updateTalk(id, name) {
    this.store.dispatch(new talkActions.Update(id, {name: name}));
  }

  deleteTalk(id) {
    this.store.dispatch(new talkActions.Delete(id));
  }
}
