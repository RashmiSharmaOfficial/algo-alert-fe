import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, NavigationEnd } from '@angular/router';
import { SnackbarService } from '../shared/services/snackbar.service';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  firebase_uid = "";
  showAuthButtons = false;
  showLogoutButton = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private snackbarService: SnackbarService,
    private authService: AuthenticationService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isMenuOpen = false;
        this.updateNavVisibility();
      }
    });
  }

  ngOnInit(): void {
    // Subscribe to Firebase auth state
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.firebase_uid = user.uid; // Get the logged-in user's UID
        localStorage.setItem('uid', this.firebase_uid); // Update localStorage as well
      } else {
        this.firebase_uid = ""; // No user logged in
        localStorage.removeItem('uid'); // Clear UID from localStorage
      }
      this.updateNavVisibility(); // Update the navbar visibility based on auth state
    });

    // Also check if there's a UID in localStorage at the start
    this.firebase_uid = localStorage.getItem("uid") || "";
    this.updateNavVisibility();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  async logout() {
    const user = await this.afAuth.currentUser;
    this.firebase_uid = ""; // Clear the UID immediately

    if (user) {
      const userId = user.uid;
      const token = await user.getIdToken();

      this.authService.revokeToken(userId, token).subscribe({
        next: () => {
          this.snackbarService.showDefaultToast("Token revoked successfully!");
          this.clearUserSession();
        },
        error: (err) => {
          console.error('Error revoking token:', err);
          this.snackbarService.showDefaultToast("Failed to revoke token.");
          this.clearUserSession();
        }
      });
    } else {
      this.clearUserSession();
    }
  }

  clearUserSession() {
    localStorage.clear();
    document.cookie = "authToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;";
    this.afAuth.signOut().then(() => {
      this.snackbarService.showDefaultToast("Logged out!");
      this.router.navigateByUrl('/auth/login');
      this.updateNavVisibility(); // Update navigation visibility after logging out
    });
  }

  updateNavVisibility() {
    const isLoginPage = ['/auth/login', '/auth/signup'].includes(this.router.url);
    this.showAuthButtons = !this.firebase_uid && !isLoginPage;
    this.showLogoutButton = !!this.firebase_uid && !isLoginPage;
  }
}
