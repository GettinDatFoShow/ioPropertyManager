import { Component, OnInit } from '@angular/core';
import { UserInfo } from '@angular/fire/auth';
import { docData, DocumentData, QuerySnapshot } from '@angular/fire/firestore';
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
    console.warn('async getUser');
    this.loading = await this.loadingController.create({
      spinner: 'circular',
      duration: 1000,
      message: 'Loading User Information...',
      translucent: true
    });
    await this.loading.present();
    this.userService.getUser(uid).then((snapshot: QuerySnapshot<DocumentData>)=> {
      console.warn('getUser(uid).then')
      console.log('for user: ', uid)
      console.log(snapshot)
      console.log(snapshot.docs)
      snapshot.forEach( (userRef)=> {
        console.warn('loading userRef')
        console.log(userRef)
        docData(userRef.ref, { idField: 'uid' }).subscribe( (user)=> {
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
