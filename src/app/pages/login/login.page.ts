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
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private userService: UserService,
    private companyService: CompanyService
    ) { }

  ngOnInit() {
    this.credentialForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  async signIn() {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.userService.signIn(this.credentialForm.value).then( async res => {
      // console.log(res);
      // TO DO: FIX THIS BELOW BROKEN CODE
      console.log(res);
      loading.dismiss();
      this.router.navigateByUrl('/tabs', {replaceUrl: true});
    }, async err => {
      loading.dismiss();
      const alert = await this.alertController.create({
        header: ':[', 
        message: err.message, 
        buttons: ['OK']
      });
      await alert.present(); 
    });
  }

  signUp() {
    this.router.navigateByUrl('/sign-up', { replaceUrl: true })
  }

  get email() {
    return this.credentialForm.get('email');
  }

  get password() {
    return this.credentialForm.get('password');
  }
}
