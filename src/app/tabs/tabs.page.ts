import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Company } from '../global/models/globals.model';
import { CompanyService } from '../services/company/company.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  tabsLocked: boolean = true;
  companyTabLockSubscription: Subscription;

  constructor(private companyService: CompanyService) {
    
  }

  ionViewWillEnter() {
    this.companyTabLockSubscription = this.companyService.companyTabLock.subscribe({
      next: (company: Company) => {
        company.cid !== null && company.cid !== undefined ? this.tabsLocked = false : null;
      }
    })
  }

}
