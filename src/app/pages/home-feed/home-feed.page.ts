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
      this.userService.userInfoChangeSub.subscribe((user)=>{
        this.getUser();
      });

     }

  ngOnInit() {
        
  }

  ionViewWillEnter() {
    this.getUser();
  }

  getUser() {
    this.user = this.userService.getCurrentUser();
    console.warn('home feed user');
    console.warn(this.user)
    this.user === null ? this.userService.reloadUser(): this.getUserCompanyInfo(this.user.companyId);
  }

  getUserCompanyInfo(cid: string) {
    this.companyService.getCompany(cid).subscribe((company: Company)=> {
      this.company = company;
      this.companyService.unlockTabs(company);
      this.loadingUserData = false;
    })
  }

}
