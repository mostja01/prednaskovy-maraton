import { Component, OnInit } from '@angular/core';
import {SignInComponent} from '../sign-in/sign-in.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-warm-up',
  templateUrl: './warm-up.component.html',
  styleUrls: ['./warm-up.component.css']
})
export class WarmUpComponent implements OnInit {

  constructor(
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
  }


  openSignInDialog(): void {
    this.dialog.open(SignInComponent, {
      disableClose: false,
    });
  }
}
