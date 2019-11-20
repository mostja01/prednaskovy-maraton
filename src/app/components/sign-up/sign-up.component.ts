import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AppUser} from '../../model/appUser';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public userForm: FormGroup;
  public isUnknownError = false;
  public passReset = false; // set to true when password reset is triggered
  public formErrors = {
    'email': '',
    'password': ''
  };
  public validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email must be a valid email'
    },
    'password': {
      'required': 'Password is required.',
      'pattern': 'Password must be include at one letter and one number.',
      'minlength': 'Password must be at least 4 characters long.',
      'maxlength': 'Password cannot be more than 40 characters long.',
    }
  };

  constructor(private fb: FormBuilder,
              private router: Router,
              private auth: AuthService) {
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  public signUpWithEmail(): void {
    this.auth.emailSignUp(this.userForm.value['email'], this.userForm.value['password'], this.userForm.value['name'])
      .then(() => {
        this.updateUserData();
      });
  }

  public buildForm(): void {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
      ],
      'name': [''],
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  public signInWithGoogle(): void {
    this.auth.googleLogin()
      .then(() => this.afterSignIn());
  }

  public resetPassword() {
    this.auth.resetPassword(this.userForm.value['email'])
      .then(() => this.passReset = true);
  }

  private updateUserData() {
    let user: AppUser;
    this.auth.userData.subscribe((userData: AppUser) => {
      if (userData === null) {
        return;
      }
      user = userData;
      user.patch().then((_) => {
        this.afterSignIn();
      });
    });
  }

  // Updates validation state on form changes.
  public onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }
    this.auth.lastUsedName = this.userForm.get('name').value;
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  private afterSignIn(): void {
    // Do after login stuff here, such router redirects, toast messages, etc.
    if (this.auth.authState) {
      this.router.navigate(['profile']);
    } else {
      this.isUnknownError = true;
    }
  }
}
