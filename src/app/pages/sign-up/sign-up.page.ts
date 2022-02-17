import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'iopm-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  userSelection: boolean = false;
  isOwner: boolean = null;
  public signUpForm: FormGroup;
  companyForm: FormGroup;
  companyNames: string[] = ['KB Homes'];
  
  constructor(private _fb: FormBuilder) { 
    
  }

  ngOnInit() {
    // this.signUpForm = new FormGroup({
    //   email: new FormControl(['', [Validators.required, Validators.email]]),
    //   name: new FormControl(['', [Validators.required]]),
    //   membership: new FormControl(['', [Validators.required]]),
    //   companyName: new FormControl(['', [Validators.required]]),
    //   phone: new FormControl(['', [Validators.required, Validators.minLength(10)]]),
    //   password: new FormControl(['', [Validators.required]]),
    //   confirm_password: new FormControl(['', [Validators.required]]),
    // })
    this.signUpForm = this._fb.group({
      signInEmail: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      membership: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(10)]],
      confirm_password: ['', [Validators.required]],
    })
  }

  userTypeSelection(event: CustomEvent) {
    console.log(event)
    this.isOwner = event.detail.value === 'owner';
    this.userSelection = true

    this.signUpForm.setValue({membership: event.detail.value});
    console.log(this.signUpForm)
    if (this.isOwner) {
      this.companyForm = this._fb.group({

      })
    }
  }

  passwordConfirming(control: AbstractControl): { invalid: boolean } {
    if (control.get('password').value !== control.get('confirm_password').value) {
        return {invalid: true};
    }
  }

  get signUpEmail() {
    return this.signUpForm.get('signUpEmail');
  }

  get password() {
    return this.signUpForm.get('passwords').get('password');
  }

  get confirm_password() {
    return this.signUpForm.get('passwords').get('confirm_pasword')
  }

}
