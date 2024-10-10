import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable, take } from 'rxjs';

// export const authGuardGuard: CanActivateFn = (route, state) => {
//   return true;
// };

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) { }


  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(take(1), map(user => {
      if (user) {
        return true; //allow access if logged in
      } else {
        this.router.navigate(['/auth/login']);
        return false;
      }
    }))
  }
}
