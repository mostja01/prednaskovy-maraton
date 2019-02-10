import { Component, OnInit } from '@angular/core';
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
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  closeNavbar() {
    this.navbarOpen = false;
  }

  constructor(public authService: AuthService,
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

  logOut() {
    this.authService.signOut();
  }

  openSignInDialog(): void {
    this.dialog.open(SignInComponent, {
      disableClose: false,
    });
  }
}
