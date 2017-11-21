import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLoggedIn$ = this.authService.currentUserObservable;
  window = window;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.isLoggedIn$.subscribe(data => {
      console.log(data);
    });
  }

  logOut() {
    this.authService.signOut();
  }
}
