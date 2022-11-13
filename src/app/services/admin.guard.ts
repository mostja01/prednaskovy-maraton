import {AuthService} from './auth.service';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise<boolean>((resolve) => {
      this.authService.userData.subscribe((data)=>{
        if(data){
          resolve(data?.isAdmin);
        }
      })
    });
  }
}
