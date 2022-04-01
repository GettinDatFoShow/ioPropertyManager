import { Component, OnInit } from '@angular/core';
import { UserInfo } from '@angular/fire/auth';
import { docData } from '@angular/fire/firestore';
import {  LoadingController } from '@ionic/angular';
import { NotificationPopupService } from '../../services/notification-popup/notification-popup.service';
import { Company, Property, User } from '../../global/models/globals.model';
import { CompanyService } from '../../services/company/company.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'iopm-home-feed',
  templateUrl: './home-feed.page.html',
  styleUrls: ['./home-feed.page.scss'],
})
export class HomeFeedPage implements OnInit {

  user: User = null;
  companyTitle = ''; // name will be pulled from user when used to sign up. 
  loading: HTMLIonLoadingElement;
  company: Company = null;
  properties: Property[] = [];

  constructor(
    private userService: UserService,
    private loadingController: LoadingController,
    private companyService: CompanyService,
    private notificationService: NotificationPopupService
    ) {
      this.userService.userInfoChangeSub.subscribe({
        next: (user: UserInfo) => {
          console.log('USER INFO CHANGE CAUGHT');
          console.log(user);
          this.getUser(user.uid);
        }
      });
     }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // this.getUser();
  }

  async getUser(uid: string) {
    this.loading = await this.loadingController.create({
      spinner: 'circular',
      duration: 1000,
      message: 'Loading User Information...',
      translucent: true
    });
    await this.loading.present();
    await this.userService.getUser(uid).then((snapshot)=> {
      snapshot.forEach( async (userRef)=> {
        docData(userRef.ref, { idField: 'uid' }).subscribe( async (user)=> {
          console.log('user ref doc data');
          console.log(user);
          this.userService.currentUser = user;
          this.companyService.currentCompanyId = user.companyId
          this.getUserCompanyInfo(user.companyId);
          this.userService.userInfoChangeSub.unsubscribe();
          this.loading.dismiss();
        });
      })
    }, (err) => {
      this.notificationService.presentToast('Could not locate user information..', 'danger', 'sad-outline');
    });
  }

  getUserCompanyInfo(cid: string) {
    this.companyService.getCompany(cid).subscribe((company: Company)=> {
      console.log('getting user company information..');
      console.log(company);
      this.company = company;
      this.companyService.unlockTabs(company);
    })
  }

}
