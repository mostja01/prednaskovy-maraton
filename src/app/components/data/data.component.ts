import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {TopicLinesService} from '../../services/topic-lines.service';
import {TalksPresenter} from '../../shared/classes/talks-presenter';
import {MatDialog} from '@angular/material/dialog';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {AuthService} from '../../services/auth.service';
import {AppUser} from '../../model/appUser';

@Component({
  selector: 'app-rules',
  templateUrl: './data.component.html',
})
export class DataComponent extends TalksPresenter  implements OnInit {
  public users = "";
  constructor(
    private dialog: MatDialog,
    afs: AngularFirestore,
    public usersService: UsersService,
    private auth: AuthService,
    topicLinesService: TopicLinesService) {
    super(afs, topicLinesService, auth);
  }

  ngOnInit() {
    const users = this.usersService.getUsers();
    users.subscribe((data)=>{
       this.users = JSON.stringify(data);
    })
  }

  public getTalksJson(){
    return JSON.stringify(this.clearedTalks());
  }

  public clearedTalks(){
    const out: any[] = [];
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
