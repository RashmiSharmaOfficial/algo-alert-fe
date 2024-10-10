import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private afAuth: AngularFireAuth) { }

  getUserUId(): Promise<string | null> {
    return this.afAuth.currentUser.then(user => user ? user.uid : null);
  }

  revokeToken(userId: string | null, token: string) {
    return this.http.post(`${environment.BASE_URL}/revoke-token`, userId, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

}
