import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../shared/services/auth.service';
// import { SignInComponent } from '../sign-in/sign-in.component';
import { MatDialog } from '@angular/material';
import {AuthService} from '../../services/auth.service';
import {AppUser} from '../../model/appUser';
import {SignInComponent} from '../sign-in/sign-in.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public user: AppUser = null;
  // isLoggedIn$ = this.authService.currentUserObservable;
  window = window;

  constructor(private authService: AuthService,
              private dialog: MatDialog,
              private router: Router,
              ) {
  }

  public ngOnInit() {
    this.authService.userData.subscribe(user => {
      this.user = user;
      if (user && (!user.hasAllObligatoryFields() || !user.willAttend)) {
        this.router.navigate(['/profile']);
      }
    });
  }

  // get displayName() {
  //   return this.authService.currentUserDisplayName;
  // }

  logOut() {
    this.authService.signOut();
  }

  openSignInDialog(): void {
    this.dialog.open(SignInComponent, {
      disableClose: false,
    });
  }
}
