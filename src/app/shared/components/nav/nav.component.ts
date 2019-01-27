import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../shared/services/auth.service';
// import { SignInComponent } from '../sign-in/sign-in.component';
import { MatDialog } from '@angular/material';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  // isLoggedIn$ = this.authService.currentUserObservable;
  window = window;

  constructor(private authService: AuthService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    // this.isLoggedIn$.subscribe(data => {
    //   console.log(data);
    // });
  }

  // get displayName() {
  //   return this.authService.currentUserDisplayName;
  // }

  logOut() {
    // this.authService.signOut();
  }

  openSignInDialog(): void {
    // this.dialog.open(SignInComponent, {
    //   disableClose: false,
    // });
  }
}
