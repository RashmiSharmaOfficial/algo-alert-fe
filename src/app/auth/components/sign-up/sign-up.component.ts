import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // Import auth module

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  errorMessage: string | null = null;
  formErrors: any = {};

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private router: Router) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
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

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? null : { mismatch: true };
  }

  validateForm() {
    this.formErrors = {};
    const formControls = this.signUpForm.controls;
    for (const control in formControls) {
      if (formControls[control].errors) {
        this.formErrors[control] = Object.values(formControls[control].errors || {}).join(', ');
      }
    }
    if (this.signUpForm.errors) {
      this.formErrors['general'] = 'Please correct the errors in the form.';
    }
  }

  async onSubmit() {
    this.validateForm();

    if (this.signUpForm.valid) {
      const { name, email, password } = this.signUpForm.value;
      try {
        const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
        if (userCredential.user) {
          await userCredential.user.updateProfile({ displayName: name });
          console.log('User created successfully:', userCredential.user);
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
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error: any) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        this.errorMessage = 'The email address is already in use by another account.';
        break;
      case 'auth/invalid-email':
        this.errorMessage = 'The email address is not valid.';
        break;
      case 'auth/weak-password':
        this.errorMessage = 'The password is too weak. It should be at least 6 characters long.';
        break;
      default:
        this.errorMessage = 'An error occurred during sign-up. Please try again.';
    }
  }
}