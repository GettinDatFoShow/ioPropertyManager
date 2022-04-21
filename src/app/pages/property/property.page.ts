import { Component } from '@angular/core';
import { AddPropertyComponent } from './add-property/add-property.component';
import { ModalController } from '@ionic/angular';
import { Company, Property } from '../../global/models/globals.model';
import { CompanyService } from '../../services/company/company.service';
import { UserService } from '../../services/user/user.service';
import { NotificationPopupService } from '../../services/notification-popup/notification-popup.service';

@Component({
  selector: 'iopm-property',
  templateUrl: './property.page.html',
  styleUrls: ['./property.page.scss'],
})
export class PropertyPage {

  properties: Property[] = [];
  fullViewIndex: number = 1;

  constructor(
    private modalController: ModalController,
    // private popoverController: PopoverController, 
    private companyService: CompanyService,
    private notficationPopupService: NotificationPopupService,
    private userService: UserService
    ) {

  }

  ionViewWillEnter() {
    console.log('ION WILL ENTER');
    console.log(this.userService.currentUser)
    this.companyService.getCompany(this.userService.currentUser.companyId).subscribe((company: Company) => {
      console.log('getting company....');
      console.log(company);
      if (!!company.properties){
        this.properties = company.properties;
      }
    })
  }
  
  async addProperty(ev: any) {
    const popover = await this.modalController.create({
      component: AddPropertyComponent,
      // cssClass: 'my-custom-class',
      // event: ev,
      // translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  viewPhotoClick() {
    this.clickWarning('View Photo');
  }

  locationClick() {
    this.clickWarning('View Location');
  }

  calendarClick() {
    this.clickWarning('View Schedule');
  }

  addOwnerClick() {
    this.clickWarning('View Owners');
  }

  activeClick() {
    this.clickWarning('View Active');
  }

  editClick() {
    this.clickWarning('Edit Property');
  }

  private clickWarning(functionName: string) {
    this.notficationPopupService.clickWarning(functionName);
  }
}
