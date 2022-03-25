import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { CompanyService } from 'src/app/services/company/company.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'iopm-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentialForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _alertController: AlertController,
    private _loadingController: LoadingController,
    private _userService: UserService,
    private _companyService: CompanyService
    ) { }

  ngOnInit() {
    this.credentialForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  async signIn() {
    const loading = await this._loadingController.create();
    await loading.present();
    this._userService.signIn(this.credentialForm.value).then(user => {
      loading.dismiss();
      this._router.navigateByUrl('/tabs', {replaceUrl: true});
    }, async err => {
      loading.dismiss();
      const alert = await this._alertController.create({
        header: ':[', 
        message: err.message, 
        buttons: ['OK']
      });
      await alert.present(); 
    });
  }

  signUp() {
    this._router.navigateByUrl('/sign-up', { replaceUrl: true })
  }

  get email() {
    return this.credentialForm.get('email');
  }

  get password() {
    return this.credentialForm.get('password');
  }
}
