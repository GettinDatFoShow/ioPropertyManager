import { Component, OnInit } from '@angular/core';
import { docData, DocumentData, QuerySnapshot } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
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
    private userService: UserService
    ) { }

  ngOnInit() {
    this.credentialForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
    this.updateEmail();
  }

  async signIn() {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.userService.signIn(this.credentialForm.value).then( async res => {
      // TO DO: FIX THIS BELOW BROKEN CODE
      console.warn(res);
      await this.userService.getUser(res.user.uid).then((snapshot: QuerySnapshot<DocumentData>)=> {
        snapshot.forEach( (userRef)=> {
          docData(userRef.ref, { idField: 'uid' }).subscribe( (user)=> {
            this.userService.currentUser = user;

            loading.dismiss();
            this.router.navigateByUrl('/tabs', {replaceUrl: true});
          });
          // this.loadingUserData = false;
        })
        
      }).catch((err) => {
        // this.loadingUserData = false;
        // this.notificationService.presentToast('Could not locate user information..', 'danger', 'sad-outline');
        console.error(err);
      }).finally(() => {
        // this.loadingUserData = false;
      });

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

  updateEmail() {
    if (this.credentialForm.get('email').valid) {
      this.credentialForm.get('password').enable({onlySelf: true});
    } else {
      this.credentialForm.get('password').disable({onlySelf: true});
    }
  }

  get email() {
    return this.credentialForm.get('email');
  }

  get password() {
    return this.credentialForm.get('password');
  }
}
