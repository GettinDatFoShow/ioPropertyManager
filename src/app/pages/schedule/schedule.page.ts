import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AddScheduleDateComponent } from '../../components/add-schedule-date/add-schedule-date.component';
import { Company, User } from '../../global/models/globals.model';
import { CompanyService } from '../../services/company/company.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'iopm-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  
  isPopoverOpen: boolean = false;
  today: Date = new Date();
  exDate: Date = new Date('Wed May 18 2022 14:00:00 GMT-0400');
  exDate1: Date = new Date('Mon Jun 13 2022 09:00:00 GMT-0400');
  exDate2: Date = new Date('Fri Jun 24 2022 10:00:00 GMT-0400');
  exDate3: Date = new Date('Thu Jul 28 2022 13:00:00 GMT-0400');
  user: User = null;
  company: Company = null;
  
  constructor(private popoverController: PopoverController, private userService: UserService, private companyService: CompanyService) {
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
    console.log(this.today);
  }

  addEvent() {
    // this.isPopoverOpen = true;
    this.presentPopover('add schedule');
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: AddScheduleDateComponent,
      // cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();
  
    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  popoverClosed() {
    this.isPopoverOpen = false;
    console.log('POPOVER CLOSED')
  }


}
