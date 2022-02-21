import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ContactDetails, Owner, Company } from '../../global/models/globals.model';

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
    this.signUpForm = this._fb.group({
      signInEmail: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      membership: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, this.createPasswordStrengthValidator(), Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    })
  }

  userEmployerInput(event: any) {
    this.signUpForm.setValue['companyName'] = event.detail.value;
  }

  userTypeSelection(event: any) {
    this.isOwner = event.detail.value === 'owner';
    this.userSelection = true
    this.signUpForm.value['membership'] = event.detail.value;
    if (this.isOwner) {
      this.companyForm = this._fb.group({
        email: ['', [Validators.email]],
        zip: ['', [Validators.required]],
        address: ['', [Validators.required]],
        state: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.minLength(8)]],
        city: ['', [Validators.required]],
        website: [''],
      })
    }
  }

  confirmPassword(): boolean {
    if (this.signUpForm.get('confirmPassword').dirty && this.signUpForm.get('password').value !== this.signUpForm.get('confirmPassword').value) {
        return false;
    }
    return true;
  }

  passwordWarningCheck(): boolean {
    return this.signUpForm.get('password').invalid && this.signUpForm.get('password').dirty;
  }

  protected createPasswordStrengthValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if (!value) {
            return null;
        }
        const hasUpperCase = /[A-Z]+/.test(value);
        const hasLowerCase = /[a-z]+/.test(value);
        const hasNumeric = /[0-9]+/.test(value);
        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;
        return !passwordValid ? {passwordStrength:true}: null;
    }
  }

  async signUp() {
    if (this.isOwner) {
      const company: Company = {
        contactDetails: <ContactDetails> {
          phone: this.companyForm.get('phone').value,
          email: this.companyForm.get('email').value,
          website: this.companyForm.get('website').value
        }
      }
      const newUser: Owner = {

      }
    } else {

    }

    // const loading = await this._loadingController.create();
    // await loading.present();
  
    // this._userService.signUp(this.credentialForm.value).then(user => {
    //   loading.dismiss();
    //   this._router.navigateByUrl('/tabs', {replaceUrl: true});
    // }, async err => {
    //   loading.dismiss();
    //   const alert = await this._alertController.create({
    //     header: 'Sign up failed', 
    //     message: err.message, 
    //     buttons: ['OK']
    //   });
    //   await alert.present(); 
    // })

    console.log(this.signUpForm);
    console.log(this.companyForm);
    alert('SIGN UP CLICK!!!')
  }

  get signUpEmail() {
    return this.signUpForm.get('signUpEmail');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirm_password() {
    return this.signUpForm.get('confirmPasword')
  }

}
