import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {TopicLinesService} from '../../services/topic-lines.service';
import {TalksPresenter} from '../../shared/classes/talks-presenter';
import {MatDialog} from '@angular/material/dialog';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {AuthService} from '../../services/auth.service';
import {Talk} from '../../model/talk';

@Component({
  selector: 'app-rules',
  templateUrl: './data.component.html',
})
export class DataComponent extends TalksPresenter  implements OnInit {

  constructor(
    private dialog: MatDialog,
    afs: AngularFirestore,
    public usersService: UsersService,
    private auth: AuthService,
    topicLinesService: TopicLinesService) {
    super(afs, topicLinesService, auth);
  }

  ngOnInit() {
  }

  public getTalksJson(){
    return JSON.stringify(this.clearedTalks());
  }

  public clearedTalks(){
    const out: any[] = [];
    const clearTalk = (talk: Talk)=>{

    }
    for(let talk of this.talksView){
      out.push({
        id: talk.talkId,
        line: talk.line?.name,
        name: talk.name,
        description: talk.description,
        note: talk.noteForOrg
      })
    }
    return out;
  }

}
