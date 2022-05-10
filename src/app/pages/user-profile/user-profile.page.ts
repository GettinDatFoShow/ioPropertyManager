import { Component } from '@angular/core';
import { CompanyService } from '../../services/company/company.service';
import { Company, User } from '../../global/models/globals.model';
import { UserService } from '../../services/user/user.service';
import { PhonePipe } from '../../global/pipes/phone/phone.pipe';

@Component({
  selector: 'iopm-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage {

  exampleDate = new Date();
  user: User = null;
  userId: string = null;
  company: Company = null;
  loadingUserData: boolean = true;

  constructor(private userService: UserService, private companyService: CompanyService, private phone: PhonePipe) {
    this.userService.userInfoChangeSub.subscribe((user)=>{ 
      this.user = user;
    });
   }

  ionViewWillEnter() {
    this.getUser();
  }

  getUser() {
    this.user = this.userService.getCurrentUser();
    console.warn('user profile user');
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
