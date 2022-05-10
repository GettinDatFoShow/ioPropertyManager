import { Component, OnInit } from '@angular/core';
import { Company, User } from '../../global/models/globals.model';
import { CompanyService } from '../../services/company/company.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'iopm-company',
  templateUrl: './company.page.html',
  styleUrls: ['./company.page.scss'],
})
export class CompanyPage implements OnInit {
  
  user: User = null;
  company: Company = null;
  
  constructor(private userService: UserService, private companyService: CompanyService) {
    this.userService.userInfoChangeSub.subscribe((user)=>{
      this.getUser();
    });
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
      // this.loadingUserData = false;
    })
  }
  ngOnInit() {
  }
}
