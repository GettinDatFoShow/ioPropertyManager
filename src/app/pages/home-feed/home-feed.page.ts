import { Component, OnInit } from '@angular/core';
import { UserInfo } from '@angular/fire/auth';
import { docData, DocumentData, QuerySnapshot } from '@angular/fire/firestore';
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
  loadingUserData: boolean = true;

  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private notificationService: NotificationPopupService
    ) {

     }

  ngOnInit() {
    this.userService.userInfoChangeSub.subscribe({
      next: (user: UserInfo) => {
        this.getUser(user.uid);
      }
    });
  }

  ionViewWillEnter() {
    // this.getUser();
  }

  async getUser(uid: string) {
    await this.userService.getUser(uid).then((snapshot: QuerySnapshot<DocumentData>)=> {
        snapshot.forEach( (userRef)=> {
          docData(userRef.ref, { idField: 'uid' }).subscribe( (user)=> {
            this.userService.currentUser = user;
            this.companyService.currentCompanyId = user.companyId
            this.getUserCompanyInfo(user.companyId);
          });
          this.loadingUserData = false;
        })
      }).catch((err) => {
        this.loadingUserData = false;
        this.notificationService.presentToast('Could not locate user information..', 'danger', 'sad-outline');
        console.error(err);
      }).finally(() => {
        this.loadingUserData = false;
    });
  }

  getUserCompanyInfo(cid: string) {
    this.companyService.getCompany(cid).subscribe((company: Company)=> {
      this.company = company;
      this.companyService.unlockTabs(company);
      this.loadingUserData = false;
    })
  }

}
