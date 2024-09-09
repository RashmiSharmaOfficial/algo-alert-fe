import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // Import auth module

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.afAuth.getRedirectResult().then(result => {
      if (result.user) {
        console.log('User signed in with Google:', result.user);
        this.router.navigate(['/questions']);
      }
    }).catch(error => {
      this.handleError(error);
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
        if (userCredential.user) {
          console.log('User signed in successfully:', userCredential.user);
          this.router.navigate(['/questions']);
        }
      } catch (error) {
        this.handleError(error);
      }
    }
  }

  async signInWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await this.afAuth.signInWithRedirect(provider);
      this.router.navigate(['/questions']);
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error: any) {
    switch (error.code) {
      case 'auth/wrong-password':
        this.errorMessage = 'The password is incorrect.';
        break;
      case 'auth/user-not-found':
        this.errorMessage = 'No user found with this email.';
        break;
      case 'auth/invalid-email':
        this.errorMessage = 'The email address is not valid.';
        break;
      default:
        this.errorMessage = 'An error occurred during login. Please try again.';
    }
  }
}