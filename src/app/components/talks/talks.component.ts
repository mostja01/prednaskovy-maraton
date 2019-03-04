import {Component, OnInit} from '@angular/core';
import {AppUser} from '../../model/appUser';
import {MatDialog} from '@angular/material';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../../services/auth.service';
import {TopicLinesService} from '../../services/topic-lines.service';
import {TalksPresenter} from '../../shared/classes/talks-presenter';

@Component({
  selector: 'app-talks',
  templateUrl: './talks.component.html',
  styleUrls: ['./talks.component.css']
})
export class TalksComponent extends TalksPresenter implements OnInit {
  public user: AppUser = null;
  universalTalk = {
    color: '#e5e186',
    created: new Date(),
    hasVoted: false,
    mainSchedule: true,
    noteForOrg: '',
    lineId: 'TG3Qyi9dZGROcygoOYDb',
    talkRef: null,
    talkId: 'GrizdDtcvFUT37PtT63U',
    userId: 'rpw0rg8mFqhz0HOJbm3dWRvHWJI3',
    voters: [],
    votesCount: 0,
  };

  programmingLine = {
    line: {color: '#e65252', name: 'Programování, IT, technika', id: 'TG3Qyi9dZGROcygoOYDb'},
    lineName: 'Programování, IT, technika',
  };
  policyLine = {
    line: {color: 'green', name: 'Politika a sociologie', id: 'TG3Qyi9dZGROcygoOYDb'},
    lineName: 'Politika a sociologie',
  };
  otherLine = {
    line: {color: 'orange', name: 'Ostatní', id: 'TG3Qyi9dZGROcygoOYDb'},
    lineName: 'Ostatní',
  };
  historyLine = {
    line: {color: '#e8e248', name: 'Historie, literatura a umění', id: 'TG3Qyi9dZGROcygoOYDb'},
    lineName: 'Historie, literatura a umění',
  };
  scienceLine = {
    line: {color: '#8579ce', name: 'Přírodní vědy', id: 'TG3Qyi9dZGROcygoOYDb'},
    lineName: 'Přírodní vědy',
  };
  sportLine = {
    line: {color: '#a6c8d8', name: 'Pohybové aktivity', id: 'TG3Qyi9dZGROcygoOYDb'},
    lineName: 'Pohybové aktivity',
  };
  managementLine = {
    line: {color: '#337ab7', name: 'Management, ekonomie, psychologie', id: 'TG3Qyi9dZGROcygoOYDb'},
    lineName: 'Management, ekonomie, psychologie',
  };
  churchLine = {
    line: {color: 'orange', name: 'Světská a církevní moc', id: 'TG3Qyi9dZGROcygoOYDb'},
    lineName: 'Církev a duchovní moc',
  };
  foodLine = {
    line: {color: '#e8e248', name: 'Výživa a stravování', id: 'TG3Qyi9dZGROcygoOYDb'},
    lineName: 'Výživa a stravování',
  };

  manualTalks = [
    {
      ...this.universalTalk,
      ...this.policyLine,
      description: 'Dozvíte se co vlastně Brexit znamená, jak to může dopadnout a jaké bude mít Brexit následky. Povíme si také něco o tom, co Brexitu předcházelo a jaká je pozice Velké Británie v EU.',
      duration: '0:50',
      name: 'Brexit',
      userName: 'Hana Brabcová',
    },
    {
      ...this.universalTalk,
      ...this.managementLine,
      description: 'Jaký je rozdíl mezi tím, jak s důchodovými penězi zachází vláda a jak by to vypadalo, pokud by tato zodpovědnost byla na každém z nás. Aneb myšlení každého znáš určí budoucnost této země.',
      duration: '0:50',
      name: 'Proč si vláda nemůže dovolit bohaté důchodce?',
      userName: 'Pavel Bednář',
    },
    {
      ...this.universalTalk,
      ...this.scienceLine,
      description: 'Popis procesů a efektů alkoholu v organizmu, aneb co se s Vámi děje, když si dáte panáka.',
      duration: '0:50',
      name: 'Metabolismus alkoholu',
      userName: 'Petr Hošek',
    },
    {
      ...this.universalTalk,
      ...this.otherLine,
      description: 'Tajemné stezky, putování Zábřežskem po stezkách legend a příběhů.',
      duration: '0:80',
      name: 'Putování Zábřežskem',
      userName: 'Miroslav Kobza',
    },
    {
      ...this.universalTalk,
      ...this.foodLine,
      description: 'Volné pokračování loňské přednášky “Mýty o potravinách”. Tentokrát o výživě. Jíme všichni a jíme každý den, naše těla využívají živiny které jim dopřáváme a s nimi také nakládá (a některé s radostí ukládá). Zamyšlení nad naším stravováním aneb jak se do lesa volá, tak se z lesa ozývá...a nebojte i pár dalších mýtů se najde :)',
      duration: '0:50',
      name: 'Výživou ke zdraví',
      userName: 'Adéla Krmelová',
    },
    {
      ...this.universalTalk,
      ...this.churchLine,
      description: 'Jak funguje církevní vzdělávání a jaká má specifika.',
      duration: '0:20',
      name: 'Církevní vzdělávací systém',
      userName: 'Jiří Koníček',
    },
    {
      ...this.universalTalk,
      ...this.programmingLine,
      description: 'Co umí umělá inteligence? Co je machine learning? Druhy machine learning. Omezení umělé inteligence.',
      duration: '0:50',
      name: 'Umělá inteligence, co umí a dokáže',
      userName: 'Marian Beiedom',
    },
    {
      ...this.universalTalk,
      ...this.programmingLine,
      description: 'Ukážeme si roli programování v nezvyklých oborech, například v archeologii. Zaměříme se na vyvolané změny na vysokých školách a na pracovním trhu.',
      duration: '0:20',
      name: 'Role programování v současné a budoucí společnosti',
      userName: 'Zdeněk Mlčoch',
    },
    {
      ...this.universalTalk,
      ...this.scienceLine,
      description: 'Máte pocit že se v dnešní hyperracionální době rozmáhá iracionalita? A je to vážně jen pocit? A co to vlastně znamená být racionální? Pokusme se tyto otázky zodpovědět.',
      duration: '0:50',
      name: 'Selhání kritického smýšlení v době sociálních sítí',
      userName: 'Lubomír Grund',
    },
    {
      ...this.universalTalk,
      ...this.policyLine,
      description: 'Lehké intro do toho co to vlastně je GDPR, k čemu slouží a jak jej naplnit z pohledu neziskové organizace a organizátora akcí.',
      duration: '0:20',
      name: 'GPDR ve zkratce',
      userName: 'Jan Mlčoch',
    },
  ];

  constructor(
    private dialog: MatDialog,
    public afs: AngularFirestore,
    private auth: AuthService,
    public topicLinesService: TopicLinesService) {
    super(afs, topicLinesService, auth);
  }

  public ngOnInit() {
    this.auth.userData.subscribe((userData: AppUser) => {
      this.user = userData;
    });
  }
}
