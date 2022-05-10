import { Component } from '@angular/core';
import { AddPropertyComponent } from './add-property/add-property.component';
import { ModalController } from '@ionic/angular';
import { Company, Property, User } from '../../global/models/globals.model';
import { CompanyService } from '../../services/company/company.service';
import { UserService } from '../../services/user/user.service';


@Component({
  selector: 'iopm-property',
  templateUrl: './property.page.html',
  styleUrls: ['./property.page.scss'],
})
export class PropertyPage {

  properties: Property[] = [];
  fullViewIndex: number = 1;
  user: User;

  constructor(
    private modalController: ModalController,
    private companyService: CompanyService,
    private userService: UserService
    ) {
      this.userService.userInfoChangeSub.subscribe((user)=>{
        this.getUser();
      });
  }

  getUser() {
    this.user = this.userService.getCurrentUser();
    console.warn('home feed user');
    console.warn(this.user)
    this.user === null ? this.userService.reloadUser(): this.getUserCompanyInfo(this.user.companyId);
  }

  getUserCompanyInfo(cid: string) {
    this.companyService.getCompany(cid).subscribe((company: Company)=> {
      this.companyService.getCompany(this.userService.currentUser.companyId).subscribe((company: Company) => {
        if (!!company.properties){
          this.properties = company.properties;
        }
      })
    })
  }

  ionViewWillEnter() {
    this.getUser();
  }
  
  async addProperty(ev: any) {
    const popover = await this.modalController.create({
      component: AddPropertyComponent,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }

}
