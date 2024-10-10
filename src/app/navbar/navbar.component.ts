import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, NavigationEnd } from '@angular/router';
import { SnackbarService } from '../shared/services/snackbar.service';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMenuOpen = false;

  constructor(private router: Router, private afAuth: AngularFireAuth, private snackbarService: SnackbarService, private authService: AuthenticationService) {
    // Listen to router events to automatically close the mobile menu
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isMenuOpen = false;
      }
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  async logout() {
    // First, get the current user to retrieve the user ID and token
    const user = await this.afAuth.currentUser;

    if (user) {
      // Get the user's UID
      const userId = user.uid;

      // Get the token before signing out
      const token = await user.getIdToken();

      // Call revokeToken with the userId
      this.authService.revokeToken(userId, token).subscribe({
        next: () => {
          // Show success message for revocation
          this.snackbarService.showDefaultToast("Token revoked successfully!");

          // Now sign out the user
          this.afAuth.signOut().then(() => {
            this.snackbarService.showDefaultToast("Logged out!");
            this.router.navigateByUrl('/auth/login');
          });
        },
        error: (err) => {
          console.error('Error revoking token:', err);
          this.snackbarService.showDefaultToast("Failed to revoke token.");
          // Proceed to sign out anyway
          this.afAuth.signOut().then(() => {
            this.router.navigateByUrl('/auth/login');
          });
        }
      });
    } else {
      // If there is no user, just sign out
      this.afAuth.signOut().then(() => {
        this.snackbarService.showDefaultToast("Logged out!");
        this.router.navigateByUrl('/auth/login');
      });
    }
  }



}
